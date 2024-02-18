require("dotenv").config();

const ytdl = require("discord-ytdl-core");
const { Client, GatewayIntentBits  } = require("discord.js");
const { joinVoiceChannel,createAudioPlayer ,createAudioResource} = require('@discordjs/voice');

const client = new Client({
    intents :[GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages],
});

const prefix = "!";

client.on("ready", () => {
    console.log("ready");
    const data = [
        {
            name: 'ping',
            description: 'Replies with Pong!',
        },
        {
            name: 'echo',
            description: 'Replies with Echo!',
        },
    ];
    
    
});

client.on("interactionCreate", async interaction => { 
    
    if (!interaction.isCommand()) return; 

    const commandName = interaction.commandName;
    console.log(commandName);

    if (commandName === "ping") {
        await interaction.reply("Pong! <:Pingsock:433019097005948938>"); 
    } else if (commandName === "avatar") {
        await interaction.reply({ content: interaction.user.avatarURL() }); 
    } else if (commandName === "play") {
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
        //This is a older version which we used might be used later so commented out.

        try {
            const connection = await joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });

            const url = interaction.options.getString("url") || "https://youtu.be/QnL5P0tFkwM?si=q9z8By2auwKB3D0n"; 

            const stream = ytdl(url, {
                filter: "audioonly",
                opusEncoded: true,
                encoderArgs: ["-af", "bass=g=10,dynaudnorm=f=200"],
            });

            const player = createAudioPlayer();
            const resource = createAudioResource(stream);
            player.play(resource);
            connection.subscribe(player);

            await interaction.reply({ content: "Playing the song!" }); 
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: "Error playing the song!" });
        }
    }
});

client.login(process.env.BOT_TOKEN);
