/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 *
 * @author Microsoft
 */

import { isFinite, isNumber } from 'lodash';
import { IErrorReporter, OptionDescriptions, parseArgs } from './argv';
import { AzureMLRemoteWebsocketServer } from './azureMLRemoteWebsocketServer';

const serverOptions: OptionDescriptions<IServerParsedArgs> = {
    commit: { type: 'string' },
    port: { type: 'string' },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'vscode-server-port': { type: 'string' }
};

export interface IServerParsedArgs {
    commit: string;
    port?: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'vscode-server-port': string;
}

const errorReporter: IErrorReporter = {
    onMultipleValues: (id: string, usedValue: string): void => {
        console.error(`Option ${id} can only be defined once. Using value ${usedValue}.`);
    },

    onUnknownOption: (id: string): void => {
        console.error(`Ignoring option ${id}: not supported for server.`);
    }
};

/**
 *
 */
async function start(): Promise<void> {
    const args: IServerParsedArgs = parseArgs(process.argv.slice(2), serverOptions, errorReporter);
    const port: number = parsePort(<string>args.port, 0);
    const vscodeServerPort: number = parsePort(<string>args['vscode-server-port']);

    const server: AzureMLRemoteWebsocketServer = new AzureMLRemoteWebsocketServer();
    await server.start({ port: port, vscodeServerPort: vscodeServerPort, vscodeServerCommitId: args.commit });

    process.on('exit', (): void => {
        server.dispose();
        console.log('Process exit');
    });
}

/**
 * @param {string} strPort The port to parse
 * @param defaultPort The default port to use if strPort is invalid
 * @returns {number} The parsed port
 */
function parsePort(strPort: string, defaultPort?: number): number {
    let port: number = Number.parseInt(strPort, 10);

    if (!isFinite(port)) {
        if (isNumber(defaultPort) && isFinite(defaultPort)) {
            console.log(`Port is not a number: ${strPort}. Using ${defaultPort} instead.`);
            port = defaultPort;
        } else {
            console.log(`Port is not a number: ${strPort}`);
            throw new Error('Unable to parse port. Port is not a number');
        }
    }

    return port;
}

start();
