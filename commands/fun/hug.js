const Djs = require('discord.js');
const { get } = require('node-superfetch');

module.exports = {
    name: "hug",
    aliases: [],
    category: "fun",
    description: "memeluk seseorang",
    usage: "[hug]",
    run: async (client, message, args, color) => {
	
	var user = message.mentions.users.first() || client.users.cache.get(args[0]);
	if(!args[0]){
        return message.channel.send(":x: " + "| You need to mention user you want to hug")
    }
	
	const { body } = await get('https://nekos.life/api/v2/img/hug');
	
	var embed = new Djs.MessageEmbed()
	if(user.id === message.author.id) {
		embed.setDescription(`**${message.author.username}**, Are you alone? Okay here some hug for you.`)
		embed.setImage(body.url).setColor(color) 
	    embed.setFooter(`Request by: ${message.author.tag} | ${client.user.username} v4.7`) 
	} else if(user.id === client.user) {
	embed.setDescription(`Oh thanks **${message.author.username}** for giving me your hugs, So cute.`)
	embed.setImage(body.url).setColor(color) 
	embed.setFooter(`Request by: ${message.author.tag} | ${client.user.username} v4.7`) 
	} else {
	embed.setDescription(`**${message.author.username}** hugs **${user.username}**`)
	embed.setImage(body.url)
	embed.setFooter(`Request by: ${message.author.tag} | ${client.user.username} v4.7`) 
	} 
	embed.setColor(color)
	return message.channel.send(embed);
	
	} 
}