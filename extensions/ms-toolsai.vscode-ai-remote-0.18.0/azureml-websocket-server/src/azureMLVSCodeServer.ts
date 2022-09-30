/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 *
 * @author Microsoft
 */

import { ILogger } from './common/log';
import { httpGet } from './http';

/**
 * Azure ML representation of VS Code Server
 */
export class AzureMLVSCodeServer {
    public constructor(
        private readonly _port: number,
        private readonly _commitId: string,
        private readonly logService: ILogger
    ) {}

    public get commitId(): string {
        return this._commitId;
    }

    public get port(): number {
        return this._port;
    }

    public async isRunning(): Promise<boolean> {
        try {
            const result: string = await httpGet(`http://127.0.0.1:${this.port}/version`);
            return result === this.commitId;
        } catch (e) {
            this.logService.info(`Failed to reach vscode server. ${e}`);
            return false;
        }
    }
}
