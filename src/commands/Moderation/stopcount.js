const count = require('../../mongoEvents/countSchema.js') 
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stopcount')
		.setDescription('stops counting'),
	async execute(interaction, client) {
        if(!interaction.member.permissions.has("MANAGE_GUILD")) return interaction.reply({content: `${interaction.member}, you do not have permission to use this command`, ephemeral: true})
        const currentCount = await count.findOneAndDelete({channelId: interaction.channel.id, guildId: interaction.guild.id})

            interaction.reply(currentCount ? "stopped counting in this channel" : "no count is active in this channel");


	},
};