const fs = require('fs');
const login = require('facebook-chat-api');
const config = require('./config.json');

const botName = config.botName;
const prefix = config.prefix;
const admins = config.admins;

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
        
        // এটিই গুরুত্বপূর্ণ অংশ: মেসেজ ইভেন্ট কিনা তা পরীক্ষা করা
        if (event.type === "message" && event.body) {
            const messageBody = event.body;
            const senderID = event.senderID;

            if (messageBody && messageBody.startsWith(prefix)) {
                const args = messageBody.slice(prefix.length).trim().split(/ +/);
                const command = args.shift().toLowerCase();

                if (command === "ping") {
                    api.sendMessage("Pong!", event.threadID);
                }

                if (admins.includes(senderID)) {
                    // অ্যাডমিনদের জন্য কমান্ড এখানে যুক্ত হবে
                }
            }
        }
    });
});
