/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 *
 * @author Microsoft
 */

import * as http from 'http';
import * as https from 'https';
import * as url from 'url';
import { isNil } from 'lodash';

/**
 * Wrapper for HTTP HET function
 *
 * @param aUrl The url
 * @param options HTTP GET options
 */
export const httpGet = async (aUrl: string | undefined, options: https.RequestOptions = {}): Promise<string> =>
    new Promise((resolve: (value: string) => void, reject: (error: Error) => void): void => {
        options = <https.RequestOptions>{
            rejectUnauthorized: false,
            ...options
        };

        let get: typeof http.get = http.get;
        if (!isNil(aUrl)) {
            const parsedUrl: url.UrlWithStringQuery = url.parse(aUrl);
            options = {
                ...options,
                ...parsedUrl
            };
            get = parsedUrl.protocol === 'https:' ? https.get : http.get;
        }

        get(options, (response: http.IncomingMessage): void => {
            let responseData: string = '';
            response.on('data', (chunk: string): void => {
                responseData += chunk;
            });
            response.on('end', (): void => {
                // Sometimes the 'error' event is not fired. Double check here.
                if (response.statusCode === 200) {
                    resolve(responseData);
                } else {
                    reject(new Error(responseData.trim()));
                }
            });
        }).on('error', (e: Error): void => {
            reject(e);
        });
    });
