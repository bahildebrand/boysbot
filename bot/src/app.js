"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const token = process.env.DISCORD_TOKEN;
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
    ],
});
client.once("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});
client.on("messageCreate", (message) => {
    // Ignore messages from bots
    if (message.author.bot)
        return;
    console.log(`[${message.author.tag}] ${message.content}`);
});
client.login(token).catch((err) => {
    console.error("Failed to login:", err);
});
