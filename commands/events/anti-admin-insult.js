credit:EVAN RAJ
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');
const logger = require('../utils/logger');

// Replace with your actual admin ID(s) from your config file
const adminIDs = ["your_admin_id_here"]; 
const offensiveWords = ["শালা", "হারামজাদা", "কুত্তা", "মাগির", "চুতিয়া"]; // Add more words here

module.exports = {
  name: "handleAdminInsult",
  description: "Trolls users who insult the admin using their own profile picture.",
  execute(api, event) {
    const message = event.body.toLowerCase();
    const insultedAdmin = event.mentions?.[adminIDs[0]]?.id;
    const containsOffensiveWord = offensiveWords.some(word => message.includes(word));

    if (insultedAdmin && containsOffensiveWord) {
      async function createTrollMeme() {
        try {
          // Get the user's profile picture URL
          const userProfileInfo = await api.getUserInfo(event.senderID);
          const userProfilePicUrl = userProfileInfo[event.senderID].thumbSrc;

          const imageResponse = await axios.get(userProfilePicUrl, { responseType: 'arraybuffer' });
          const image = await Jimp.read(imageResponse.data);

          // Get the default font
          const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
          const fontBig = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
          
          const memeText = [
            "এডমিনকে গালি দেওয়ার সাহস? 😏",
            "ভুল জায়গায় এসেছো বন্ধু!",
            "এই সেই ব্যক্তি যে এডমিনকে গালি দিয়েছে 😂"
          ];
          const randomText = memeText[Math.floor(Math.random() * memeText.length)];

          // Add text to the image
          image.resize(Jimp.AUTO, 500);
          image.print(fontBig, 10, 10, "Oops!");
          image.print(font, 10, 80, randomText);

          const outputPath = path.join(__dirname, `../cache/troll_meme_${Date.now()}.jpg`);
          await image.writeAsync(outputPath);

          api.sendMessage({
            body: `আরে ভাই! ${event.senderID} মনে হয় জানে না এডমিন কে। এখন তাকে নিয়ে একটু মজা করা যাক।`,
            attachment: fs.createReadStream(outputPath)
          }, event.threadID, () => fs.unlinkSync(outputPath));
          
          logger.log(`User ${event.senderID} trolled with a meme.`, "warn");

        } catch (error) {
          logger.log(`Failed to create troll meme: ${error.message}`, "error");
          api.sendMessage("দুঃখিত, এখন ট্রল করতে পারছি না।", event.threadID);
        }
      }
      
      createTrollMeme();
    }
  },
};
