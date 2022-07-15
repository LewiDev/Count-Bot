const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const client = new Client({partials: ["MESSAGE", "CHANNEL", "REACTION"], intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]});
const { token } = require('../config.json')

client.commands = new Collection();
const functions = fs.readdirSync('./functions').filter(file => file.endsWith('.js'));
const eventsFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync('./commands');
(async () => {
    for(file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventsFiles, './events');
    client.handleCommands(commandFolders, './commands');
    client.login(token);
    client.dbLogin();

})(); 
