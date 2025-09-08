// commands/admin/admin.js

import { logger } from '../../utils/logger.js';
import * as config from '../../utils/config.js';
import loader from '../../utils/loader.js';

export default {
  name: "admin",
  description: "Advanced bot administration commands (Admin only).",
  
  async execute(api, event, args) {
    // Only allow the bot admin to use these commands
    if (event.senderID !== config.adminID) {
      logger.warn(`Non-admin user ${event.senderID} tried to use the admin command.`);
      api.sendMessage("তুমি এই কমান্ডটি ব্যবহার করার অনুমতিপ্রাপ্ত নও।", event.threadID);
      return;
    }

    const subCommand = args[0]?.toLowerCase();

    switch (subCommand) {
      case 'reload':
        try {
          logger.custom("Reloading all commands and events...");
          api.sendMessage("কমান্ড এবং ইভেন্টগুলো রিলোড করা হচ্ছে...", event.threadID);

          await loader.loadModules('commands');
          await loader.loadModules('events');
          
          api.sendMessage("✅ কমান্ড এবং ইভেন্টগুলো সফলভাবে রিলোড হয়েছে।", event.threadID);
          logger.info("Commands and events successfully reloaded.");
        } catch (error) {
          logger.error(`Failed to reload modules: ${error.message}`);
          api.sendMessage("রিলোড করতে ব্যর্থ হয়েছে। বিস্তারিত কনসোলে দেখুন।", event.threadID);
        }
        break;

      case 'restart':
        logger.custom("Bot is restarting...");
        api.sendMessage("বট রিস্টার্ট করা হচ্ছে...", event.threadID, () => {
          process.exit(1);
        });
        break;

      case 'broadcast':
        const messageToBroadcast = args.slice(1).join(" ");
        if (!messageToBroadcast) {
          api.sendMessage("অনুগ্রহ করে একটি মেসেজ লিখুন যা ব্রডকাস্ট করতে চান।", event.threadID);
          break;
        }

        logger.custom(`Broadcasting message: "${messageToBroadcast}"`);
        api.getThreadList(100, null, ['GROUP'], (err, list) => {
          if (err) {
            logger.error(`Failed to get thread list: ${err.message}`);
            return;
          }
          list.forEach(thread => {
            api.sendMessage(messageToBroadcast, thread.threadID, (err) => {
              if (err) {
                logger.error(`Failed to broadcast to ${thread.threadID}: ${err.message}`);
              }
            });
          });
          api.sendMessage("মেসেজটি সমস্ত গ্রুপে ব্রডকাস্ট করা হয়েছে।", event.threadID);
        });
        break;
      
      case 'help':
      default:
        const helpMessage = `
🌐 অ্যাডমিন কমান্ডসমূহ:
!admin reload - সব কমান্ড ও ইভেন্ট রিলোড করে।
!admin restart - বট রিস্টার্ট করে।
!admin broadcast <message> - সব গ্রুপে একটি মেসেজ ব্রডকাস্ট করে।
        `;
        api.sendMessage(helpMessage.trim(), event.threadID);
        break;
    }
  }
};
