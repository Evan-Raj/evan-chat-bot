var login = require("facebook-chat-api");

login({email: "YOUR_EMAIL", password: "YOUR_PASSWORD"}, (err, api) => {
    if(err) return console.error(err);

    api.listen((err, message) => {
        if(message.body === "hello") {
            api.sendMessage("Hi there!", message.threadID);
        }
    });
});
