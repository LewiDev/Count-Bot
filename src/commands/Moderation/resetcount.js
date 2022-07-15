const count = require('../../mongoEvents/countSchema.js') 
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resetcount')
		.setDescription('Resets the count in this channel'),
	async execute(interaction, client) {
        if(!interaction.member.permissions.has("MANAGE_GUILD")) return interaction.reply({content: `${interaction.member}, you do not have permission to use this command`, ephemeral: true})
		const currentCount = count.findOne({channelId: interaction.channel.id, guildId: interaction.guild.id}, async (err, data) => {
            if(data) {
                data.num = 1;
                data.save();
                interaction.reply('Count reset! Next Number **1**')
            } else {
                interaction.reply('There is no count in this channel')
            }
        }) 

        

	},
};