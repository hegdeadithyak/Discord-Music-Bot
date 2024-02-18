const { Client, Collection, GatewayIntentBits } = require("discord.js");


const bot = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});



const { useMainPlayer } = require('discord-player');

async function execute(interaction) {
    const player = useMainPlayer();
    const channel = interaction.member.voice.channel;
    if (!channel) return interaction.reply('You are not connected to a voice channel!'); 
    const query = interaction.options.getString('query', true); 
   
    await interaction.deferReply();

    try {
        const { track } = await player.play(channel, query, {
            nodeOptions: {
                metadata: interaction
            }
        });

        return interaction.followUp(`**${track.title}** enqueued!`);
    } catch (e) {
        return interaction.followUp(`Something went wrong: ${e}`);
    }
}

bot.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === '!play') {
        await execute(interaction);
    }
});

bot.login("MTE3OTg0ODk2MDMyNDY4NTg3NA.GP89-2.qnt65yDFB3JgVn3Xuk2u7uN15kP83Jd7xiQKVY");