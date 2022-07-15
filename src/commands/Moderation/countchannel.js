const { SlashCommandBuilder } = require('@discordjs/builders');
const count = require('../../mongoEvents/countSchema.js') 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('countchannel')
		.setDescription('Starts counting'),
	async execute(interaction, client) {
        if(!interaction.member.permissions.has("MANAGE_GUILD")) return interaction.reply({content: `${interaction.member}, you do not have permission to use this command`, ephemeral: true})
        const currentCount = count.findOne({channelId: interaction.channel.id, guildId: interaction.guild.id}, (err, data) => {
            if(data) {
                interaction.reply(`${interaction.member}, this channel is already counting, if you want to stop counting use \`/stopcount\`, if you want to restart count use \`/resetcount\``)
            } else { 
                const newCount = count.create({
                    num: 1,
                    channelId: interaction.channel.id,
                    guildId: interaction.guild.id,
                    resetOnFail: 'on',
                    alternate: 'on',
                })
    
                interaction.reply(`Counting started, type **1** to continue!\n**failtoggle:** \`on\`\n\n*to turn this off use command \`/failtoggle off\`*`)
                
            }
        }) 

        


	},
};