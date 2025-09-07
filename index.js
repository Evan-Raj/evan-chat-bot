// EVAN RAJ 🐺
// This is an advanced and secure bot core file.

const fs = require('fs');
const path = require('path');
const login = require('fca-unofficial');
const chalk = require('chalk');
const config = require('./core/config');
const logger = require('./core/logger');
const loader = require('./core/loader');

// Define a colorful banner for the bot
const BOT_BANNER = chalk.bold.hex('#F5B041')(`
 ___________________________________________________________
|                                                           |
|                 ${chalk.bold.hex('#93A2AD')('EVAN RAJ')} - ${chalk.bold.hex('#FFFFFF')('My Bot')} 🐺                   |
|___________________________________________________________|
|                                                           |
|              Loading an advanced and secure bot...        |
|___________________________________________________________|
`);

console.log(BOT_BANNER);

// Load all commands and events from their respective directories
const commands = loader.loadModules('commands', 'COMMANDS');
const events = loader.loadModules('events', 'EVENTS');

// Start the bot login process
login(config.fcaOption, (err, api) => {
  if (err) {
    logger.log(chalk.red.bold(`Login failed: ${err.message}`), "error");
    return console.error(err);
  }
  
  logger.log(chalk.green.bold("Login successful! Bot is now online."), "info");

  api.setOptions({
    selfListen: config.fcaOption.selfListen,
    logLevel: 'silent', // Setting log level to silent to let our custom logger handle it
  });

  api.listenMqtt(async (err, event) => {
    if (err) return logger.log(chalk.red.bold(`MQTT error: ${err.message}`), "error");
    
    // Command handling
    if (event.type === "message" && event.body) {
      const args = event.body.split(" ");
      const commandName = args.shift().toLowerCase().slice(config.prefix.length);

      if (commands.has(commandName)) {
        try {
          commands.get(commandName).execute(api, event, args);
          logger.log(chalk.cyan(`Executed command: ${commandName} by ${event.senderID}`), "info");
        } catch (error) {
          logger.log(chalk.red.bold(`Error executing command: ${commandName}`), "error");
          console.error(error);
        }
      }
    }

    // Event handling
    if (events.has(event.type)) {
      try {
        events.get(event.type).execute(api, event);
        logger.log(chalk.magenta(`Executed event: ${event.type}`), "info");
      } catch (error) {
        logger.log(chalk.red.bold(`Error executing event: ${event.type}`), "error");
        console.error(error);
      }
    }
  });
});
