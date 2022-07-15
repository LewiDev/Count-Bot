const {
	SlashCommandBuilder
} = require('@discordjs/builders');
const {
	MessageEmbed
} = require('discord.js');
const countlead = require('../../mongoEvents/countleadSchema.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Displays the top 5 counters!'),
	async execute(interaction, client) {

		countlead.find({
				guildId: interaction.guild.id
			})
			.sort([
				['xp', 'descending']
			]).exec(async(err, res) => {
				if (err) console.log(err);

				let embed = new MessageEmbed()
					.setTitle('Counting Leaderboard!')
					.setFooter('countbot', `${client.user.displayAvatarURL()}`)
				if (res.length === 0) {
				
					embed.addField("No Data Found!", "start counting to get yourself a place on the leaderboard!");
				} else if (res.length < 5) {
					for (i = 0; i < res.length; i++) {
						let member = await client.users.fetch(res[i].userId);
						let count = res[i].xp
						
						embed.addField(`${i + 1}) ${member.tag}`, `Counts: ${count}`)
					}
				} else {
					for (i = 0; i < 5; i++) {
						let member = await client.users.fetch(res[i].userId);
						let count = res[i].xp
						
						embed.addField(`${i + 1}) ${member.tag}`, `Counts: ${count}`)
					}
				}
				interaction.reply({
					embeds: [embed]
				})

			})
	},
};