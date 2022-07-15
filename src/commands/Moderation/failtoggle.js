const { SlashCommandBuilder } = require('@discordjs/builders');
const count = require('../../mongoEvents/countSchema.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('failtoggle')
		.setDescription('Start or stop reset when wrong number typed')
        .addStringOption(option => option.setName('toggle').setDescription('turn it on or off (on/off)').setRequired(true)),
	async execute(interaction, client) {
        if(!interaction.member.permissions.has("MANAGE_GUILD")) return interaction.reply({content: `${interaction.member}, you do not have permission to use this command`, ephemeral: true})
        const toggle = interaction.options.getString('toggle')

        if(toggle === 'on') {
            const currentCount = count.findOne({channelId: interaction.channel.id, guildId: interaction.guild.id}, (err, data) => {
                if(data) {
                    data.resetOnFail = toggle
                    data.save()
                    interaction.reply({content: 'changed toggle to on!', ephemeral: true})
                } else {
                    interaction.reply({content: 'There is no active count in this channel!'})
                }
            })
        } else if(toggle === 'off') {
            const currentCount = count.findOne({channelId: interaction.channel.id, guildId: interaction.guild.id}, (err, data) => {
                if(data) {
                    data.resetOnFail = toggle
                    data.save()
                    interaction.reply({content: 'changed toggle to off!', ephemeral: true})
                } else {
                    interaction.reply({content: 'There is no active count in this channel!'})
                }
            })
        } else {
            interaction.reply({content: `${interaction.member}, incorrent toggle provided (on/off)`, ephemeral: true})
        }
        
  	},
};