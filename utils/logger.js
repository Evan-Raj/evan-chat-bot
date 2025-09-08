// utils/logger.js

import chalk from 'chalk';

const logger = {
    info: (message) => {
        const timestamp = new Date().toLocaleTimeString('bn-BD');
        console.log(`[${chalk.hex('#00FFFF')('INFO')}] [${chalk.gray(timestamp)}] ${message}`);
    },
    warn: (message) => {
        const timestamp = new Date().toLocaleTimeString('bn-BD');
        console.log(`[${chalk.hex('#FFBF00')('WARN')}] [${chalk.gray(timestamp)}] ${chalk.yellow(message)}`);
    },
    error: (message) => {
        const timestamp = new Date().toLocaleTimeString('bn-BD');
        console.error(`[${chalk.hex('#FF0000')('ERROR')}] [${chalk.gray(timestamp)}] ${chalk.red(message)}`);
    },
    custom: (message) => {
        console.log(chalk.bold.hex('#E600FF')(`∞∞ EVAN RAJ » `) + chalk.hex('#F0FFF0')(`${message}`));
    }
};

export { logger };
