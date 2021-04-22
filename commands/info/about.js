const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "about",
  aliases: [],
  category: "info",
  description: "Returns all commands, or one specific command info",
  usage: "[About Information]",
  run: async (client, message, args) => {
    let owner = client.users.cache.get("584678988815794176");
    let co = client.users.cache.get("584678988815794176");
    let embed = new MessageEmbed()
      .setColor("GREEN")
      .setAuthor("Raeiℤers Bio")
      .setDescription(
        `**Raeiℤers is a discord bot, this bot has moderation features,games and much more**
**This bot was created by ${owner.tag}. if you find an error command, please contact ${owner.tag}. if you find a bug in this bot please use the link below**
**Use this link**
[[Support Server]](https://discord.gg/deqqktj65h)
Created by: RZ Group™ & ${co.tag}`
      )
      .setFooter(`© RZ Group 2021`);
    message.channel.send(embed);
  }
};