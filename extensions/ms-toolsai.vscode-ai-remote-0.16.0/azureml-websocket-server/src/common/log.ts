/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 *
 * @author Microsoft
 */

export enum LogLevel {
    Trace,
    Debug,
    Info,
    Warning,
    Error,
    Critical,
    Off
}

export const DEFAULT_LOG_LEVEL: LogLevel = LogLevel.Info;

export interface ILogger {
    /**
     * Writes a critical message.
     *
     * @param message string or error that will be parsed to string.
     * @param args Method supports a variable number of arguments that will be joined with space and appended to
     * message.
     */
    critical(message: string | Error, ...args: unknown[]): void;
    /**
     * Writes a debug message.
     *
     * @param message
     * @param args Method supports a variable number of arguments that will be joined with space and appended to
     * message.
     */
    debug(message: string, ...args: unknown[]): void;
    /**
     * Writes a error message.
     *
     * @param message string or error that will be parsed to string.
     * @param args Method supports a variable number of arguments that will be joined with space and appended to
     * message.
     */
    error(message: string | Error, ...args: unknown[]): void;
    /**
     * Gets the current log level configured for this logger.
     *
     * @returns Log level configured.
     */
    getLevel(): LogLevel;
    /**
     * Writes a info message.
     *
     * @param message
     * @param args Method supports a variable number of arguments that will be joined with space and appended to
     * message.
     */
    info(message: string, ...args: unknown[]): void;
    /**
     * Sets the log leved for this logger.
     *
     * @param level Target log level.
     */
    setLevel(level: LogLevel): void;
    /**
     * Writes a trace message.
     *
     * @param message
     * @param args Method supports a variable number of arguments that will be joined with space and appended to
     * message.
     */
    trace(message: string, ...args: unknown[]): void;

    /**
     * Writes a warn message.
     *
     * @param message
     * @param args Method supports a variable number of arguments that will be joined with space and appended to
     * message.
     */
    warn(message: string, ...args: unknown[]): void;
}
