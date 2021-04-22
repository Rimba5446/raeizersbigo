const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "invite",
    category: "moderation",
    run: (client, message) => {
        const botID = '812906945827569685' // Your bot id
        const embed = new MessageEmbed()
        .setTitle(`${client.user.username} invite`)
        .setURL(`https://discord.com/oauth2/authorize?client_id=812906945827569685&scope=bot&permissions=8589934591`)
        .setColor('RANDOM')
        .setFooter(`Thank you for choosing RaeiZers BOT as your moderation server`);
        message.channel.send(embed)
    }
}