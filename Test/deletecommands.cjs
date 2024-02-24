require('dotenv').config()
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');


const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

//Replace the commandId with the id of the command you want to delete
rest.delete(Routes.applicationCommand(process.env.clientId, "commandId"))
	.then(() => console.log('Successfully deleted application command'))
	.catch(console.error);