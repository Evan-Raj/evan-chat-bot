const fs = require('fs');
const login = require('facebook-chat-api');
const config = require('./config.json');

// config ফাইল থেকে তথ্যগুলো বের করে নেওয়া
const botName = config.botName;
const prefix = config.prefix;
const admins = config.admins;

// appState.json ফাইল থেকে appState পড়ে নেওয়া
let appState;
try {
  appState = JSON.parse(fs.readFileSync('appState.json', 'utf8'));
} catch (e) {
  console.error("appState.json ফাইল খুঁজে পাওয়া যায়নি অথবা ত্রুটিপূর্ণ।");
  console.log("ইমেইল ও পাসওয়ার্ড দিয়ে লগইন করার জন্য কোডটি ব্যবহার করুন।");
  process.exit(1);
}

login({ appState: appState }, (err, api) => {
    if (err) return console.error(err);

    console.log(`${botName} সফলভাবে চালু হয়েছে!`);
    api.listenMqtt((err, event) => {
        if (err) return console.error(err);
        
        if (event.type === 'message') {
            const messageBody = event.body;
            const senderID = event.senderID;

            if (messageBody && messageBody.startsWith(prefix)) {
                const args = messageBody.slice(prefix.length).trim().split(/ +/);
                const command = args.shift().toLowerCase();

                // উদাহরণস্বরূপ, একটি 'ping' কমান্ড
                if (command === "ping") {
                    api.sendMessage("Pong!", event.threadID);
                }

                // যদি অ্যাডমিনদের মধ্যে একজন কমান্ড দেয়
                if (admins.includes(senderID)) {
                    // এখানে অ্যাডমিনদের জন্য বিশেষ কমান্ড যুক্ত করা যাবে
                }
            }
        }
    });
});
