const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg');
const opus = require('node-opus');
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ]
});

// Queue to store requested songs
const queue = new Map();

// Command prefix
const prefix = '!';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  let serverQueue;

  switch (command) {
    case 'play':
      if (!args.length) return message.reply('Please provide a song URL or name.');
      serverQueue = queue.get(message.guild.id);
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) return message.reply('You need to be in a voice channel to play music.');
      const permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
        return message.reply('I need the permissions to join and speak in your voice channel!');
      }
      const songInfo = await ytdl.getInfo(args[0]);
      const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
      };
      if (!serverQueue) {
        const queueContruct = {
          textChannel: message.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true,
        };
        queue.set(message.guild.id, queueContruct);
        queueContruct.songs.push(song);
        try {
          const connection = await voiceChannel.join();
          queueContruct.connection = connection;
          play(message.guild, queueContruct.songs[0]);
        } catch (err) {
          console.error(err);
          queue.delete(message.guild.id);
          return message.reply(err);
        }
      } else {
        serverQueue.songs.push(song);
        return message.reply(`${song.title} has been added to the queue!`);
      }

      break;
    case 'skip':
      serverQueue = queue.get(message.guild.id);
      if (!serverQueue) return message.channel.send('There is no song in the queue.');
      serverQueue.connection.stop();
      message.channel.send('Skipped current song!');
      break;
    case 'queue':
      serverQueue = queue.get(message.guild.id);
      if (!serverQueue) return message.channel.send('There is no song in the queue.');
      message.channel.send(`**Queue:**\n${serverQueue.songs.map((song, index) => `${index + 1}. ${song.title}`).join('\n')}`);
      break;
    default:
      message.channel.send(`Invalid command! Use "${prefix}help" for list of commands.`);
  }
});

client.login("MTE3OTg0ODk2MDMyNDY4NTg3NA.GP89-2.qnt65yDFB3JgVn3Xuk2u7uN15kP83Jd7xiQKVY");
