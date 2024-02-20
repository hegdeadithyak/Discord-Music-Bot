require("dotenv").config();

const ytdl = require("discord-ytdl-core");
const { Client, GatewayIntentBits  } = require("discord.js");
const { joinVoiceChannel,createAudioPlayer ,createAudioResource} = require('@discordjs/voice');
const { SlashCommandBuilder } = require('discord.js');



const client = new Client({
    intents :[GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages],
});

const prefix = "!";

client.on("ready", () => {
    console.log("Logged in as " + client.user.tag);
    new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Echoes your song')
    .addStringOption(option =>
        option.setName('input')
            .setDescription('The input to echo back')
            .setRequired(true))
//     client.application.commands.set([
//         {
//             name: "ping",
//             description: "Replies with Pong!",
//         },
//         {
//             name: "avatar",
//             description: "Replies with your avatar!",
//         },
//         {
//             name: "play",
//             description: "Plays a song!",
//             options: [
//                 {
//                     name: "url",
//                     type: "STRING",
//                     description: "The URL of the song to play",
//                     required: true,
//                 },
//             ],
//         },
//     ]).then(console.log)
//   .catch(console.error);;
    
});

client.on("interactionCreate", async interaction => { 
    
    


    if (!interaction.isCommand()) return; 
    
    const commandName =interaction.commandName;
    console.log(interaction);

    if (interaction.commandName === "ping") {
        await interaction.reply("Pong! <:Pingsock:433019097005948938>"); 
    }
    else if (interaction.commandName === "avatar") {
        await interaction.reply({ content: interaction.user.avatarURL() }); 
    } else if (interaction.commandName === "echo") {
        const input = interaction.options.getString('input');
        
        if (!interaction.member.voice.channel) {
            return await interaction.reply("You're not in a voice channel?"); 
        }

        // const stream = ytdl(
        //     "https://www.youtube.com/watch?v=QnL5P0tFkwM",
        //     {
        //         filter: "audioonly",
        //         opusEncoded: true,
        //         encoderArgs: ["-af", "bass=g=10,dynaudnorm=f=200"],
        //     }
        // );  
        // 
        //This is a older version which we used, might be used later so commented out.

        try {
            const connection = await joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
            
            const url = input.trim(); 
            console.log(url);
            const stream = ytdl(url, {
                filter: "audioonly",
                opusEncoded: true,
                encoderArgs: ["-af", "bass=g=10,dynaudnorm=f=200"],
            });

            const player = createAudioPlayer();
            const resource = createAudioResource(stream);
            player.play(resource);
            connection.subscribe(player);

            await interaction.reply({ content: `Playing the song!${url}` }); 
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: "Error playing the song!" });
        }
    }
});

client.login(process.env.BOT_TOKEN);
