const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Displays List of commands'),
	async execute(interaction, client) {
        const helpEmbedNormal = new MessageEmbed()
            .setTitle('Count Bot Commands!')
            .setColor("WHITE")
            .setFooter('countbot', `${client.user.displayAvatarURL()}`)
            .setDescription('Below are the commands for regular users, *if you are trying to set this bot up\n\nmake sure you are an* **administrator** *and run this command again*')
            .setFields(
                {name: '/leaderboard', value: 'This command shows the top 5 counters in the server!. keep counting and you may get a spot!' },
                {name: '/info {sub}', value: 'View Info on the Server, Bot, or a user!' },
                {name: '/meme', value: 'Display a random meme!' },
                {name: '/ping', value: 'Bot health check!' }
            )

            const helpEmbedAdmin = new MessageEmbed()
            .setTitle('Count Bot Commands!')
            .setColor("WHITE")
            .setFooter('countbot.info', `${client.user.displayAvatarURL()}`)
            .setDescription('Below are the commands for Admins')
            .setFields(
                {name: '/countchannel', value: 'Starts counting in the channel\n*by default the bot will restart the count after the wrong number is typed to turn this off use* **/failtoggle off** *in the count channel* ' },
                {name: '/failtoggle', value: 'By default this is enabled, it will reset the count after the wrong number is typed' },
                {name: '/resetcount', value: 'If a count is active in the channel it will set the count to 1' },
                {name: '/purge', value: 'Deleted a specified amount of messages, could help to clear up old counts!' },
                {name: '/stopcount', value: 'Stops the count in the channel the interaction was used in!' },
                {name: '/leaderboard', value: 'This command shows the top 5 counters in the server!. keep counting and you may get a spot!' },
                {name: '/info {sub}', value: 'View Info on the Server, Bot, or a user!' },
                {name: '/meme', value: 'Display a random meme!' },
                {name: '/ping', value: 'Bot health check!' }
            )

        if(interaction.member.permissions.has("ADMINISTRATOR")) {
            interaction.reply({embeds: [helpEmbedAdmin], ephemeral: true})
        } else {
            interaction.reply({embeds: [helpEmbedNormal], ephemeral: true})
        }

        
	},
};