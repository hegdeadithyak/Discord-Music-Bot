require("dotenv").config();
require("./modules/checkValid");

const { Client, Collection, GatewayIntentBits } = require("discord.js");

const { Player } = require("discord-player");

const bot = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});



