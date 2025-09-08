// EVAN RAJ 🐺
// This is an advanced and secure bot core file.

import login from 'priyanshu-fca';
import chalk from 'chalk';
import * as config from './utils/config.js';
import { logger } from './utils/logger.js';
import loader from './utils/loader.js';

// Define a colorful banner for the bot
const BOT_BANNER = chalk.bold.hex('#F5B041')(`
 ___________________________________________________________
|                                                           |
|             ${chalk.bold.hex('#93A2AD')('EVAN RAJ')} - ${chalk.bold.hex('#FFFFFF')('WOLF)} 🐺           |
|___________________________________________________________|
|                                                           |
|           Loading an advanced and secure bot...           |
|___________________________________________________________|
`);

console.log(BOT_BANNER);

// Load all commands and events from their respective directories
const commands = await loader.loadModules('commands');
const events = await loader.loadModules('events');

// Start the bot login process
login(config.fcaOption, async (err, api) => {
  if (err) {
    logger.error(`Login failed: ${err.message}`);
    return;
  }
  
  logger.info("Login successful! Bot is now online.");

  api.setOptions({
    selfListen: config.fcaOption.selfListen,
    logLevel: 'silent',
  });

  api.listenMqtt(async (err, event) => {
    if (err) return logger.error(`MQTT error: ${err.message}`);
    
    // Command handling
    if (event.type === "message" && event.body) {
      const args = event.body.split(" ");
      const commandName = args.shift().toLowerCase().slice(config.prefix.length);
      
      const command = commands.get(commandName);
      if (command) {
        try {
          await command.execute(api, event, args);
          logger.info(`Executed command: ${commandName} by ${event.senderID}`);
        } catch (error) {
          logger.error(`Error executing command '${commandName}': ${error.message}`);
          console.error(error);
        }
      }
    }

    // Event handling
    const eventHandler = events.get(event.type);
    if (eventHandler) {
      try {
        await eventHandler.execute(api, event);
        logger.info(`Executed event: ${event.type}`);
      } catch (error) {
        logger.error(`Error executing event '${event.type}': ${error.message}`);
        console.error(error);
      }
    }
  });
});
