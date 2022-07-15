const count = require('../mongoEvents/countSchema.js') 
const countlead = require('../mongoEvents/countleadSchema.js')
const {
    MessageEmbed
} = require('discord.js');
const interactionCreate = require('./interactionCreate.js');

module.exports = {
    name: 'messageCreate',
    async execute(message) {



        countlead.findOne({userId: message.author.id, guildId: message.guild.id}, (err, data) => {
            if(data) {
                return
            } else {
                if(message.author.bot) return
                const newcountlead = countlead.create({
                    xp: 0,
                    guildId: message.guild.id,
                    userId: message.author.id,
                })
            }
        })
        count.findOne({channelId: message.channel.id, guildId: message.guild.id}, (err, data) => {
            if(data) {
                if(data.resetOnFail === 'on') {
                    var number = data.num
                    var n = number.toString();
                    if(message.content === n) {
                        data.num = data.num += 1
                        data.save()
                        countlead.findOne({userId: message.author.id, guildId: message.guild.id}, (err, data) => {
				if(data) {
                            		data.xp = data.xp += 1
                            		data.save()
				} else {
					return
				}
                        })
                    } else {
                        if(message.author.bot) {
                            return
                        } else {
                            message.delete()
							message.channel.send(`**FAILED AT ${data.num}** count reset to **1**`)
                            data.num = 1
                            data.save()
                            countlead.findOne({userId: message.author.id, guildId: message.guild.id}, (err, data) => {
                                data.xp = data.xp - 20
                                data.save()
                            })
                        }

                    }
                } else {
                    var number = data.num
                    var n = number.toString();
                    if(message.content === n) {
                        data.num = data.num += 1
                        data.save()
                        countlead.findOne({userId: message.author.id, guildId: message.guild.id}, (err, data) => {
                            data.xp = data.xp += 1
                            data.save()
                        })
                    } else {
                        if(message.author.bot) return
                        countlead.findOne({userId: message.author.id, guildId: message.guild.id}, (err, data) => {
                            data.xp = data.xp - 20
                            data.save()
                        })
                        message.delete()
                    }
                }

            } else {
                return
            }
        })



    },
};