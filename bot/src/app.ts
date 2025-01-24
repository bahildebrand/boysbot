import { Client, GatewayIntentBits } from "discord.js";

const token: string | undefined = process.env.DISCORD_TOKEN;

if (!token) {
  console.error("Discord token is required to run the bot.");
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("messageCreate", (message) => {
  // Ignore messages from bots
  if (message.author.bot) return;

  console.log(`[${message.author.tag}] ${message.content}`);
});

client.login(token).catch((err) => {
  console.error("Failed to login:", err);
});
