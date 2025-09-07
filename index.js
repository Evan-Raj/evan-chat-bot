import makeWASocket, { useMultiFileAuthState } from "@adiwajshing/baileys": "6.7.5";
import axios from "axios";
import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

async function connectBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth");

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("messages.upsert", async (m) => {
    const msg = m.messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const from = msg.key.remoteJid;
    const text =
      msg.message.conversation || msg.message.extendedTextMessage?.text;

    if (text) {
      try {
        const aiReply = await getAIResponse(text);
        await sock.sendMessage(from, { text: aiReply });
      } catch (err) {
        console.error("AI Error:", err);
        await sock.sendMessage(from, { text: "⚠️ AI response failed." });
      }
    }
  });
}

async function getAIResponse(prompt) {
  const res = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    }
  );
  return res.data.choices[0].message.content.trim();
}

// Express server for deployment
const app = express();
app.get("/", (req, res) => res.send("🚀 Evan Raj Chat Bot is running... ✅"));

app.listen(process.env.PORT || 8080, () => {
  console.log(`✅ Server running on port ${process.env.PORT || 8080}`);
});

// Start bot
connectBot();
