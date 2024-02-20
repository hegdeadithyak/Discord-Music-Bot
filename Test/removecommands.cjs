require('dotenv').config()
const command = interaction.client.commands.get(interaction.commandName)
if (!command) {
  const rest = new REST().setToken(process.env.BOT_TOKEN);
  try {
        rest.delete(Routes.applicationGuildCommand(process.env.clientId,interaction.guild.id,interaction.id))
                    .then(()=> logging(`Deleted leftover command ${interaction.commandName} in guild "${interaction.guild.id}`,"minimal"))
                    .catch(err => logging(`An error occured while deleting left-over command:\n${err}`,"error"))
            } catch (error) {
                logging("An error occured while deleting left-over command:\n" + error,"error")
            }
            interaction.reply({content: "Command is outdated. It cannot be used anymore."})
}