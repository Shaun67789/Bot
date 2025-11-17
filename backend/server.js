
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

// Gracefully handle unhandled promise rejections to prevent crashes
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const app = express();
const PORT = process.env.PORT || 3001;
const CONFIG_PATH = path.join(__dirname, 'data.json');

let bot = null;
let currentConfig = null;

// --- FILE SYSTEM UTILS ---
const readConfig = async () => {
  try {
    const data = await fs.readFile(CONFIG_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading config file:', error.message);
    return null;
  }
};

const writeConfig = async (config) => {
  try {
    await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf8');
    console.log('Configuration saved.');
  } catch (error) {
    console.error('Error writing config file:', error);
    throw error;
  }
};

// --- TELEGRAM BOT LOGIC ---
const initializeBot = async () => {
  // Stop the previous bot instance if it's running
  if (bot && bot.isPolling()) {
    try {
      await bot.stopPolling({ cancel: true });
      console.log('Previous bot instance stopped.');
    } catch (err) {
      console.error("Error stopping previous bot instance:", err.message);
    }
  }
  bot = null; // Clear the reference

  const token = currentConfig?.botToken;

  // Validate token before attempting to connect
  if (!token || typeof token !== 'string' || !token.includes(':')) {
    console.warn('Bot token is missing or appears invalid. Bot will not be started.');
    return;
  }

  try {
    bot = new TelegramBot(token, { polling: true });

    // Verify the token is valid by fetching bot info
    bot.getMe().then(me => {
      console.log(`Bot initialized successfully for: ${me.username}`);
    }).catch(err => {
      console.error(`Error verifying bot token: ${err.message}. The token is likely invalid or expired.`);
      if (bot.isPolling()) {
        bot.stopPolling();
      }
    });

    // --- Attach Event Handlers ---

    // Welcome Message Handler (with error handling)
    bot.on('new_chat_members', async (msg) => {
      try {
        if (currentConfig.welcomeMessage.enabled && msg.new_chat_member) {
          const username = msg.new_chat_member.username ? `@${msg.new_chat_member.username}` : msg.new_chat_member.first_name;
          const welcomeText = currentConfig.welcomeMessage.message.replace('{username}', username);
          await bot.sendMessage(msg.chat.id, welcomeText);
        }
      } catch (error) {
        console.error('Error in "new_chat_members" handler:', error.message);
      }
    });

    // Rules Command Handler (with error handling)
    bot.onText(/\/rules/, async (msg) => {
      try {
        const rulesText = "📜 *Group Rules:*\n\n" + currentConfig.rules.map((rule, index) => `${index + 1}. ${rule}`).join('\n');
        await bot.sendMessage(msg.chat.id, rulesText, { parse_mode: 'Markdown' });
      } catch (error) {
        console.error('Error in "/rules" handler:', error.message);
      }
    });

    // Banned Words Handler (with error handling)
    bot.on('message', async (msg) => {
      // Ignore non-text messages or messages sent when a new member joins
      if (!msg.text || msg.new_chat_members) return;
      if (currentConfig.bannedWords.length === 0) return;
      
      try {
        const text = msg.text.toLowerCase();
        const isBanned = currentConfig.bannedWords.some(word => text.includes(word.toLowerCase()));

        if (isBanned) {
          await bot.deleteMessage(msg.chat.id, msg.message_id);
          const userName = msg.from.username ? `@${msg.from.username}` : msg.from.first_name;
          await bot.sendMessage(msg.chat.id, `Hey ${userName}, your message was removed for containing a banned word. Please review the /rules.`);
        }
      } catch (error) {
        console.error("Error in banned words handler (Does the bot have admin rights to delete messages?):", error.message);
      }
    });

    // Polling Error Handler
    bot.on('polling_error', (error) => {
      console.error(`Polling error: ${error.message}. This can happen with network issues or an invalid token.`);
    });

  } catch (error) {
    console.error('CRITICAL: Failed to instantiate the Telegram Bot.', error.message);
    bot = null;
  }
};


// --- EXPRESS API SERVER ---
app.use(cors());
app.use(express.json());

app.get('/api/config', (req, res) => {
  if (currentConfig) {
    res.json(currentConfig);
  } else {
    res.status(500).send('Could not read configuration from server.');
  }
});

app.post('/api/config', async (req, res) => {
  const newConfig = req.body;
  if (!newConfig) {
    return res.status(400).send('No configuration data provided.');
  }

  try {
    const oldToken = currentConfig?.botToken;
    await writeConfig(newConfig);
    currentConfig = newConfig;

    if (oldToken !== newConfig.botToken) {
      console.log('Bot token changed. Re-initializing bot...');
      initializeBot().catch(err => console.error("Error during bot re-initialization:", err));
    }

    res.status(200).send('Configuration saved successfully.');
  } catch (err) {
    console.error("Error during POST /api/config:", err.message);
    res.status(500).send('Error saving configuration.');
  }
});

// --- SERVER STARTUP ---
const startServer = async () => {
  try {
    currentConfig = await readConfig();
    if (!currentConfig) {
      console.error("FATAL: Could not read configuration file 'data.json'. The file might be missing or corrupted. Shutting down.");
      process.exit(1);
    }

    await initializeBot();

    app.listen(PORT, () => {
      console.log(`Backend server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("FATAL: Failed to start the server.", error);
    process.exit(1);
  }
};

startServer();
