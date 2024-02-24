require("dotenv").config();

const ytdl = require("discord-ytdl-core");
const { Client, GatewayIntentBits  } = require("discord.js");
const { joinVoiceChannel,createAudioPlayer ,createAudioResource} = require('@discordjs/voice');
const { SlashCommandBuilder } = require('discord.js');
const yts = require('yt-search');
const ytpl = require('ytpl');


const client = new Client({
    intents :[GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages],
});

// const prefix = "!";



client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
    const data = new SlashCommandBuilder()
    .setName('sing')
    .setDescription('Sings your song')
    .addStringOption(option =>
        option.setName('song_name')
            .setDescription('The song name to sing')
            .setRequired(true))
    client.application.commands.create(data);

});

client.on("interactionCreate", async interaction => { 
    
    
    if (!interaction.isCommand()) return; 
    
    const commandName =interaction.commandName;

    if (interaction.commandName === "ping") {
        await interaction.reply("Pong! <:Pingsock:433019097005948938>"); 
    }
    else if (interaction.commandName === "avatar") {
        await interaction.reply({ content: interaction.user.avatarURL() }); 
    } else if (interaction.commandName === "echo") {
        const input = interaction.options.getString('song_name');
        
        if (!interaction.member.voice.channel) {
            return await interaction.reply("You're not in a voice channel?"); 
        }
        try {
            const connection = await joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
             
            const {videos} = await yts(input);
            if (!videos.length) return message.channel.send("No songs were found!");
            const song = {
                title: videos[0].title,
                url: videos[0].url
            };
            
            // console.log(song);
            const stream = ytdl(song.url, {
                filter: "audioonly",
                opusEncoded: true,
                encoderArgs: ["-af", "bass=g=10,dynaudnorm=f=200"],
            });

            const player = createAudioPlayer();
            const resource = createAudioResource(stream);
            player.play(resource);
            connection.subscribe(player);

            await interaction.reply({ content: `Playing the song: ${song.url}` }); 
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: "Error playing the song!" });
        }
    }
});

client.login(process.env.BOT_TOKEN);
