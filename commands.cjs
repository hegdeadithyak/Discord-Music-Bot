const Discord = require('discord.js');

module.exports = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
    execute(message) {
      message.reply('Pong!');
    }
  },
  {
    name : "goodvibes",
    description : "Plays a good vibes Songs",
    execute(message) {
        message.channel.send("Good Vibes!");
    }
  }
];
