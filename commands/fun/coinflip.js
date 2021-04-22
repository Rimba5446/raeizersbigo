const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
//const { Color } = require("../../config.js");

module.exports = {
  name: "coinflip",
  category: "fun",
  aliases: ["toss", "flip"],
  description: "Flip A Coin!",
  usage: "Coinflip",
  run: async (client, message, args) => {
    //Start
    message.delete();
    const coins = ["Heads", "Tails", "Center"];

    let result = Math.floor(Math.random() * coins.length);

    const embed = new MessageEmbed()
     // .setColor(Color)
      .setColor("BLUE")
      .setTitle(`Coin Is`)
      .setDescription(coins[result])
      .setFooter(`Fliped by ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};