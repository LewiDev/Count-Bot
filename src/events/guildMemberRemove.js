const countlead = require('../mongoEvents/countleadSchema.js')

module.exports = {
	name: 'guildMemberRemove',
	async execute(member, client) {
		//

		countlead.findOneAndDelete({userId: member.user.id})

	},
};