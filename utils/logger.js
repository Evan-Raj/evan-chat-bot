// utils/logger.js

const chalk = require('chalk');

// A function to print log messages based on their type
const logger = {
    /**
     * Prints a log message to the console with a specific format.
     * @param {string} message The message to be logged.
     * @param {string} type The type of the message (e.g., 'info', 'warn', 'error').
     */
    log: (message, type = 'info') => {
        const timestamp = new Date().toLocaleTimeString('bn-BD');
        
        switch (type) {
            case 'info':
                console.log(`[${chalk.hex('#00FFFF')('INFO')}] [${chalk.gray(timestamp)}] ${message}`);
                break;
            case 'warn':
                console.log(`[${chalk.hex('#FFBF00')('WARN')}] [${chalk.gray(timestamp)}] ${chalk.yellow(message)}`);
                break;
            case 'error':
                console.error(`[${chalk.hex('#FF0000')('ERROR')}] [${chalk.gray(timestamp)}] ${chalk.red(message)}`);
                break;
            case 'custom':
                console.log(chalk.bold.hex('#E600FF')(`∞∞ EVAN RAJ » `) + chalk.hex('#F0FFF0')(`${message}`));
                break;
            default:
                console.log(`[${chalk.gray('LOG')}] ${message}`);
        }
    }
};

module.exports = logger;
