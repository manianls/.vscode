/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 *
 * @author Microsoft
 */

import * as net from 'net';
import * as getPort from 'get-port';
import { isNil, noop } from 'lodash';
import * as WebSocket from 'ws';
import { AzureMLVSCodeServer } from './azureMLVSCodeServer';
import { DEFAULT_LOG_LEVEL, ILogger, LogLevel } from './common/log';

/**
 * Convert a number to at least double digit string, so prepend 0 to a single digit number
 *
 * @param n The number
 * @returns The formatted string
 */
function twodigits(n: number): string {
    if (n < 10) {
        return `0${n}`;
    }
    return String(n);
}

/**
 * Function to return time in HHMMSS format
 *
 * @returns The time in that format
 */
function now(): string {
    const date: Date = new Date();
    return `${twodigits(date.getHours())}:${twodigits(date.getMinutes())}:${twodigits(date.getSeconds())}`;
}

/**
 * Logger for websocket server
 */
class ServerLogService implements ILogger {
    public readonly flush: () => void = noop;

    private level: LogLevel = DEFAULT_LOG_LEVEL;
    private readonly useColors: boolean;

    public constructor(logLevel: LogLevel = DEFAULT_LOG_LEVEL) {
        this.setLevel(logLevel);
        this.useColors = Boolean(process.stdout.isTTY);
    }

    public critical(message: string, ...args: unknown[]): void {
        if (this.getLevel() <= LogLevel.Critical) {
            if (this.useColors) {
                console.error(`\u001B[90m[${now()}]\u001B[0m`, message, ...args);
            } else {
                console.error(`[${now()}]`, message, ...args);
            }
        }
    }

    public debug(message: string, ...args: unknown[]): void {
        if (this.getLevel() <= LogLevel.Debug) {
            if (this.useColors) {
                console.log(`\u001B[90m[${now()}]\u001B[0m`, message, ...args);
            } else {
                console.log(`[${now()}]`, message, ...args);
            }
        }
    }

    public error(message: string, ...args: unknown[]): void {
        if (this.getLevel() <= LogLevel.Error) {
            if (this.useColors) {
                console.error(`\u001B[91m[${now()}]\u001B[0m`, message, ...args);
            } else {
                console.error(`[${now()}]`, message, ...args);
            }
        }
    }

    public getLevel(): LogLevel {
        return this.level;
    }

    public info(message: string, ...args: unknown[]): void {
        if (this.getLevel() <= LogLevel.Info) {
            if (this.useColors) {
                console.log(`\u001B[90m[${now()}]\u001B[0m`, message, ...args);
            } else {
                console.log(`[${now()}]`, message, ...args);
            }
        }
    }

    public setLevel(level: LogLevel): void {
        this.level = level;
    }

    public trace(message: string, ...args: unknown[]): void {
        if (this.getLevel() <= LogLevel.Trace) {
            if (this.useColors) {
                console.log(`\u001B[90m[${now()}]\u001B[0m`, message, ...args);
            } else {
                console.log(`[${now()}]`, message, ...args);
            }
        }
    }

    public warn(message: string | Error, ...args: unknown[]): void {
        if (this.getLevel() <= LogLevel.Warning) {
            if (this.useColors) {
                console.warn(`\u001B[93m[${now()}]\u001B[0m`, message, ...args);
            } else {
                console.warn(`[${now()}]`, message, ...args);
            }
        }
    }
}

export type RemoteWebsocketServerListenOptions = {
    port: number;
    vscodeServerCommitId: string;
    vscodeServerPort: number;
};

/**
 * Azure ML Websocket Server
 */
export class AzureMLRemoteWebsocketServer {
    private activeConnCount: number = 0;
    private connId: number = 0;
    private isHeartBeatRunning: boolean = false;
    private readonly logService: ILogger;
    private server: WebSocket.Server | undefined;

    public constructor() {
        this.logService = new ServerLogService();
    }

    public dispose(): void {
        if (!isNil(this.server)) {
            this.server.close();
        }
    }

    public async start(listenOptions: RemoteWebsocketServerListenOptions): Promise<void> {
        const vscodeServer: AzureMLVSCodeServer = new AzureMLVSCodeServer(
            listenOptions.vscodeServerPort,
            listenOptions.vscodeServerCommitId,
            this.logService
        );
        if (!(await vscodeServer.isRunning())) {
            this.logService.error(
                `VS Code server is not running. Port: ${vscodeServer.port}, Commit_id: ${vscodeServer.commitId}`
            );
            throw new Error(
                `VS Code server is not running. Port: ${vscodeServer.port}, Commit_id: ${vscodeServer.commitId}`
            );
        }

        this.server = new WebSocket.Server({
            port:
                listenOptions.port === 0 ? await getPort({ port: getPort.makeRange(8888, 65_535) }) : listenOptions.port
        });

        this.server.on('connection', async (websocket: WebSocket): Promise<void> => {
            const connId: number = this.connId;
            this.connId += 1;
            this.activeConnCount += 1;
            this.logService.info(`Websocket ${connId} connected.`);

            const socket: net.Socket = net.connect(vscodeServer.port);
            let sReady: boolean = false;
            let sBuffer: string | undefined;

            socket.on('close', (hadError: boolean): void => {
                this.logService.info(`Socket ${connId} closed, had_error = ${hadError}.`);
                websocket.removeAllListeners('close');
                websocket.close();
                this.onDidCloseConnection(connId, vscodeServer);
            });

            websocket.on('close', (code: number, reason: string): void => {
                this.logService.info(`Websocket ${connId} closed, code = ${code} reason = ${reason}.`);
                socket.removeAllListeners('close');
                socket.end();
                this.onDidCloseConnection(connId, vscodeServer);
            });

            websocket.on('error', (error: Error): void => {
                this.logService.error(`Websocket ${connId} error, closing connection ${error}.`);
                websocket.removeAllListeners('close');
                socket.removeAllListeners('close');
                websocket.close();
                socket.end();
                this.onDidCloseConnection(connId, vscodeServer);
            });

            socket.on('error', (error: Error): void => {
                this.logService.error(`Socket ${connId} error, closing connection ${error}.`);
                websocket.removeAllListeners('close');
                socket.removeAllListeners('close');
                websocket.close();
                socket.end();
                this.onDidCloseConnection(connId, vscodeServer);
            });

            socket.on('connect', (): void => {
                this.logService.info(`Socket ${connId} connected.`);
                sReady = true;
                if (!isNil(sBuffer) && sBuffer.length > 0) {
                    socket.write(sBuffer);
                }
                sBuffer = undefined;
            });

            socket.on('data', (data: Buffer): void => {
                websocket.send(data, (error?: Error): void => {
                    if (!isNil(error)) {
                        this.logService.error(`Socket ${connId} error sending data to vscode-client ${error}`);
                    }
                });
            });

            websocket.on('message', (data: WebSocket.Data): void => {
                if (!sReady && !isNil(sBuffer)) {
                    sBuffer = `${sBuffer}${<string>data}`;
                } else {
                    socket.write(<Buffer>data);
                }
            });
        });

        this.server.on('error', (error: Error): void => {
            this.logService.error(`Error occurred in server. ${error}`);
        });

        this.server.on('listening', (): void => {
            if (!isNil(this.server)) {
                console.log(
                    `Azure ML websocket server listening on ${(<WebSocket.AddressInfo>this.server.address()).port}`
                );
                console.log();
                console.log();
                // tslint:enable: no-console

                this.logService.info('Azure ML websocket server started');
            } else {
                this.logService.error('Unexpected error while getting websocket server port');
                throw new Error('Unexpected error while getting websocket server port');
            }
        });
    }

    private cancelHeartBeat(): void {
        if (this.isHeartBeatRunning) {
            this.logService.info('Cancelling heart beat for shutdown');
            this.isHeartBeatRunning = false;
        }
    }

    private async delay(ms: number): Promise<void> {
        return new Promise<void>((resolve: () => void): void => {
            setTimeout(resolve, ms);
        });
    }

    private hasActiveConn(): boolean {
        return this.activeConnCount > 0;
    }

    private onDidCloseConnection(connId: number, vscodeServer: AzureMLVSCodeServer): void {
        this.activeConnCount -= 1;
        this.logService.info(`Connection ${connId} closed. Active connections: ${this.activeConnCount}`);

        if (!this.hasActiveConn()) {
            this.logService.info('Last connection closed, starting heart beat to shutdown with vscode server');
            this.startHeartBeat(vscodeServer);
        } else {
            this.cancelHeartBeat();
        }
    }

    private shutdown(): void {
        if (this.hasActiveConn()) {
            this.logService.info('New connection opened, aborting shutdown');
            return;
        } else {
            this.logService.info('Last connection closed, shutting down');
            this.dispose();
            // eslint-disable-next-line unicorn/no-process-exit
            process.exit(0);
        }
    }

    private async startHeartBeat(vscodeServer: AzureMLVSCodeServer): Promise<void> {
        if (!this.isHeartBeatRunning) {
            this.isHeartBeatRunning = true;
            while (this.isHeartBeatRunning && !this.hasActiveConn()) {
                if (!(await vscodeServer.isRunning())) {
                    this.isHeartBeatRunning = false;
                    this.shutdown();
                    return;
                }

                await this.delay(100);
            }
            this.logService.info('Heart beat stopped');
        }
    }
}
