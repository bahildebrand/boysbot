import { Client, GatewayIntentBits } from "discord.js";
import { db } from "./db/db";
import { NewMessage } from "./db/schema";

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

client.on("messageCreate", async (message) => {
  // Ignore messages from bots
  if (message.author.bot) return;

  console.log(`[${message.author.tag}] ${message.content}`);
  try {
    await db
      .insertInto("message")
      .values({
        timestamp: message.createdAt,
        snowflake: message.author.id,
        message: message.content,
      })
      .execute();
  } catch (e) {
    console.log(`Failed to record message: ${e}`);
  }
});

client.login(token).catch((err) => {
  console.error("Failed to login:", err);
});
