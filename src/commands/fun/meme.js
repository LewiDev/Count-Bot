const fetch = require('node-fetch')
const link = 'https://www.reddit.com/r/dankmemes.json?sort=top&t=week'
const {
	SlashCommandBuilder
} = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Displays a random meme!'),
	async execute(interaction, client) {
		const Discord = require('discord.js');
        	let fetchMemes = await fetch(link).then(m => m.json())
        	const getMemes = fetchMemes.data.children;
        	let randomMeme = getMemes[Math.floor(Math.random() * getMemes.length)]
        	let memeEmbed = new Discord.MessageEmbed()
        	const NewEmbed = new Discord.MessageEmbed()
            		.setColor('WHITE')
            		.setTitle(randomMeme.data.title)
            		.setImage(randomMeme.data.url)
            		.setFooter('countbot', `${client.user.displayAvatarURL()}`)

           interaction.reply({embeds: [NewEmbed] });
	}
};
