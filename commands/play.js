module.exports = {
    name: 'play',
    description: 'Play a song',
    execute(message, args, client, distube) {
        const queue = distube.getQueue(message);
        try {
            if (args.length > 0) {
                distube.play(message.member.voice.channel, args.join(' '), {
                    member: message.member,
                    textChannel: message.channel,
                    message,
                });
            } else {
                queue.resume();
            }
        } catch (e) {
            message.channel.send(`${client.emotes.error} | Error: \`${e}\``);
        }
    },
};