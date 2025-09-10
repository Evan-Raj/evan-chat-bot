const { spawn } = require("child_process");
const axios = require("axios");
const logger = require("./utils/log");

///////////////////////////////////////////////////////////
//========= Create website for dashboard/uptime =========//
///////////////////////////////////////////////////////////

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// Serve the index.html file
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

// Start the server and add error handling
app.listen(port, () => {
    logger(`Server is running on port ${port}...`, "[ EVAN RAJ ]");
}).on('error', (err) => {
    if (err.code === 'EACCES') {
        logger(`Permission denied. Cannot bind to port ${port}.`, "[ EVAN RAJ ]");
    } else {
        logger(`Server error: ${err.message}`, "[ নজর রাইখো নতুন কিছুর জন্য  ]");
    }
});

/////////////////////////////////////////////////////////
//========= Start bot with auto-restart on crash =======//
/////////////////////////////////////////////////////////

global.countRestart = global.countRestart || 0;

function startBot(message) {
    if (message) logger(message, "[ EVAN RAJ ]");

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "raj.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", (codeExit) => {
        if (codeExit !== 0 && global.countRestart < 5) {
            global.countRestart++;
            logger(`Bot exited with code ${codeExit}. Restarting... (${global.countRestart}/5)`, "[ WOLF🐺 ]");
            startBot();
        } else {
            logger(`Bot stopped after ${global.countRestart} restarts.`, "[ EVAN RAJ]");
        }
    });

    child.on("error", (error) => {
        logger(`An error occurred: ${JSON.stringify(error)}`, "[ WOLF🐺 ]");
    });
}

////////////////////////////////////////////////
//========= Check update from GitHub =========//
////////////////////////////////////////////////

axios.get("https://raw.githubusercontent.com/priyanshu192/bot/main/package.json")
    .then((res) => {
        logger(res.data.name, "[ EVAN RAJ ]");
        logger(`Version: ${res.data.version}`, "[ EVAN RAJ]");
        logger(res.data.description, "[ EVAN RAJ ]");
    })
    .catch((err) => {
        logger(`Failed to fetch update info: ${err.message}`, "[ WOLF🐺 ]");
    });

// Start the bot
startBot();
