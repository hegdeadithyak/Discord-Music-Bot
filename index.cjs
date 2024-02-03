//Documentaion https://discord.js.org/docs/packages/discord.js/14.14.1

// Import required modules
const { Client, GatewayIntentBits } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const ytdl = require('ytdl-core');

const TOKEN = "MTE3OTg0ODk2MDMyNDY4NTg3NA.GP89-2.qnt65yDFB3JgVn3Xuk2u7uN15kP83Jd7xiQKVY";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ]
});


class Queue {
    constructor() {
      this.items = [];
    }
  
    enqueue(item) {
      this.items.push(item);
    }
  
    dequeue() {
      return this.items.shift();
    }
  
    peek() {
      return this.items[0];
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  }
  
  const queue = new Queue();


client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    await client.application.commands.create(
        new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
        new SlashCommandBuilder().setName('play').setDescription('Plays Music!'),
        new SlashCommandBuilder().setName('skip').setDescription('skips current'))
    });

client.on("reconnecting",()=>{
    console.log("Reconnecting");
})









client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const serverQueue = queue.get(interaction.guild.id);
    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
    if (interaction.startsWith(`play`)) {
        execute(message, serverQueue);
        return;
       } else if (interaction.startsWith(`skip`)) {
        skip(message, serverQueue);
        return;
       } else if (interaction.startsWith(`stop`)) {
        stop(message, serverQueue);
        return;
       } else {
        message.channel.send('You need to enter a valid command!')
       }
});


client.login(TOKEN)