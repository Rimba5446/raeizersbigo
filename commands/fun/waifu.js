const { MessageEmbed } = require('discord.js')
const axios = require('axios')

module.exports = {

    guildOnly: false,

    name: 'waifu',
    commands: ['waifu'],
    aliases: [''],
    description: "Get a cute waifu >w<",

    // requiredPermissions: [''],
    cooldown: "5s",
    category: "fun",

    // expectedArgs: "",

    minArgs: 0,
    maxArgs: 0,

    run: async (client, message, args) => {
        const { member, channel, mentions } = message
        const user = message.member.user
        const target = mentions.members.first()

        try {

            axios
            .get('https://waifu.pics/api/sfw/waifu')
            .then((res) => {
              const embed = new MessageEmbed()
                .setImage(res.data.url)
                .setTimestamp()
                //.setColor('#f9fcc5')
              channel.send(embed)
            })

        } catch (err) {
            console.log('uwu I have a fucky err: ' + err)
            message.channel.send('uwu I have a fucky err: ' + err)
        }
    }
}