/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 *
 * @author Microsoft
 */

import { isNil, noop } from 'lodash';
import * as minimist from 'minimist';

export interface IOption<OptionType> {
    type: OptionType;
}

export type OptionDescriptions<T> = {
    [P in keyof T]: IOption<OptionTypeName<T[P]>>;
};

type OptionTypeName<T> = T extends boolean
    ? 'boolean'
    : T extends string
    ? 'string'
    : T extends string[]
    ? 'string[]'
    : T extends undefined
    ? 'undefined'
    : 'unknown';

export interface IErrorReporter {
    onMultipleValues(id: string, usedValue: string): void;
    onUnknownOption(id: string): void;
}

const ignoringReporter: IErrorReporter = {
    onUnknownOption: noop,
    onMultipleValues: noop
};

/**
 *
 * @param args The args object to parse
 * @param options The option descriptions
 * @param errorReporter The error reporter
 * @returns The parsed args
 */
export function parseArgs<T>(
    args: string[],
    options: OptionDescriptions<T>,
    errorReporter: IErrorReporter = ignoringReporter
): T {
    const alias: { [key: string]: string } = {};
    const string: string[] = [];
    const boolean: string[] = [];
    for (const optionId of Object.keys(options)) {
        if (optionId[0] === '_') {
            continue;
        }

        const o: IOption<OptionTypeName<T[keyof T]>> = options[<keyof T>optionId];

        if (o.type === 'string' || o.type === 'string[]') {
            string.push(optionId);
        } else if (o.type === 'boolean') {
            boolean.push(optionId);
        }
    }

    // remove aliases to avoid confusion
    const parsedArgs: minimist.ParsedArgs = minimist(args, { string, boolean, alias });

    const cleanedArgs: Partial<minimist.ParsedArgs> = {};
    const remainingArgs: Partial<minimist.ParsedArgs> = parsedArgs;

    // https://github.com/microsoft/vscode/issues/58177, https://github.com/microsoft/vscode/issues/106617
    cleanedArgs._ = parsedArgs._.map(String).filter((arg: string): boolean => arg.length > 0);

    delete remainingArgs._;

    for (const optionId of Object.keys(options)) {
        const o: IOption<OptionTypeName<T[keyof T]>> = options[<keyof T>optionId];

        let val: unknown = remainingArgs[optionId];

        if (typeof val !== 'undefined') {
            if (o.type === 'string[]') {
                if (!isNil(val) && !Array.isArray(val)) {
                    val = [val];
                }
            } else if (o.type === 'string' && Array.isArray(val)) {
                val = val.pop(); // take the last
                errorReporter.onMultipleValues(optionId, <string>val);
            }
            cleanedArgs[optionId] = val;
        }
        delete remainingArgs[optionId];
    }

    for (const key of Object.keys(remainingArgs)) {
        errorReporter.onUnknownOption(key);
    }

    return <T>cleanedArgs;
}
