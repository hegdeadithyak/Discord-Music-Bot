import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

import {prefix,BOT_TOKEN}from './config.json';


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  
  client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === 'play') {
      await interaction.reply('Under Construction!');
    }
  });
  
client.login(BOT_TOKEN);