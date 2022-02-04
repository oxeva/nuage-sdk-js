import LOG from './logLevel';
import time from './time';

export default class Logger {
    /**
     * Level logger
     */
    static #level = '';

    /**
     * Message prefix for each logs
     */
    static #prefix = {
        error: '⛔ %c',
        warn: '🤫 %c',
        info: 'ℹ️ %c',
        log: '👀 %c',
    };

    /**
     * Style log for each levels
     */
    static #style = {
        error: 'color:#f44336;font-weight:bold;',
        warn: 'color:#ff9800;text-decoration:underline;',
        info: 'color:#1e88e5;font-weight:bold;',
        log: 'color:#607d8b;font-style:italic;',
    };

    /**
     * Find out if the rank corresponds to the level of the global logger
     */
    static #isAvailable(rank) {
        const isRanked = Logger.#level.length >= rank;

        // The rank does not reach level global
        if (!isRanked) {
            return false;
        }

        // Index at which to start extraction
        const start = rank * -1;

        // Index before which to end extraction
        const end = rank === 1 ? undefined : start + 1;

        // Extract value of the rank on global level
        const binary = Logger.#level.slice(start, end);

        // Value is it available ?
        return Boolean(Number(binary));
    }

    /**
     * Push the styled log into the buffer
     */
    static #print(method, ...rest) {
        const [entry, ...others] = rest;

        // Params to be sent to the real logging function
        let params = rest;

        // Styles associate to the method
        const styles = Logger.#style[method];

        if (typeof entry === 'string') {
            params = [
                `${Logger.#prefix[method] + time()} - ${entry}`,
                styles,
                ...others,
            ];
        } else {
            params = [
                `${Logger.#prefix[method] + time()} - `,
                styles,
                ...params,
            ];
        }

        window.console.log.apply(console, params);
    }

    /**
     * Define global level for logger module
     */
    static config(logLevel = LOG.ERROR) {
        // Transform decimal to binary string
        Logger.#level = Number(logLevel).toString(2);
    }

    /**
     * Write a error log entry
     */
    static error(...rest) {
        // is "error" allowed ?
        if (!Logger.#isAvailable(1)) {
            return;
        }

        Logger.#print('error', ...rest);
    }

    /**
     * Write a warning log entry
     */
    static warn(...rest) {
        // is "warn" allowed ?
        if (!Logger.#isAvailable(2)) {
            return;
        }

        Logger.#print('warn', ...rest);
    }

    /**
     * Write a notice log entry
     */
    static notice(...rest) {
        // is "notice" allowed ?
        if (!Logger.#isAvailable(3)) {
            return;
        }

        Logger.#print('log', ...rest);
    }

    /**
     * Write a information log entry
     */
    static info(...rest) {
        // is "info" allowed ?
        if (!Logger.#isAvailable(4)) {
            return;
        }

        Logger.#print('info', ...rest);
    }

    /**
     * Write a debug log entry
     */
    static debug(...rest) {
        // is "debug" allowed ?
        if (!Logger.#isAvailable(5)) {
            return;
        }

        Logger.#print('log', ...rest);
    }
}
