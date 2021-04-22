const Djs = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require("os");

module.exports = {
  name: "bot",
  aliases: [],
  category: "info",
  description: "This command is to see the status and bot info!",
  usage: "[1 | 2 | 3]",
  run: async (bot, msg, args) => {
    let optraw = args.slice(0).join(" ");
    let opt = optraw.toLocaleLowerCase();
    const filter = m => m.author.id === msg.author.id;
    let tono = Djs.MessageEmbed;

    let embed1 = new tono()
      .setColor("GREEN")
      .setDescription(
        `| [1️⃣] » Stats | [2️⃣] » Info | [🔴] » Exit |`
      )
      .setTimestamp()
      .setFooter("Development by » RaykujanK13");
    const m = await msg.channel.send(embed1);
    await m.react("1️⃣");
    await m.react("2️⃣");
    await m.react("🔴");
    async function awaitReaction() {
      const filter = (rect, usr) =>
        ["1️⃣", "2️⃣", "🔴"].includes(rect.emoji.name) &&
        usr.id === msg.author.id;
      const response = await m.awaitReactions(filter, {
        max: 1,
        time: 1000000
      });
      if (!response.size) {
        return undefined;
      }
      const emoji = response.first().emoji.name;
      if (emoji == "1️⃣") {
        const duration = moment
          .duration(bot.uptime)
          .format(" D [Days], H [Hours], m [Minutes], s [Seconds]");
        let max = 10;
        let cpu = Math.round(process.cpuUsage().system);
        let cpupercent = Math.round((cpu * max) / 100000 / 10);
        let api = bot.ws.ping ? Math.round(bot.ws.ping) : 0;
        let Embed = new Djs.MessageEmbed()
          .setColor("RED")
          .setTitle(`${bot.user.tag} Stats`, `${bot.user.displayAvatarURL}`)
          .setFooter(`Powered by  »  Discord.js`)
          .setTimestamp()
          .addField(
            "• Bot Guild Statistic •",
            `\`\`\`Servers » ${bot.guilds.cache.size}
Users » ${bot.guilds.cache
              .reduce((a, b) => a + b.memberCount, 0)
              .toLocaleString()}
Channels » ${bot.channels.cache.size}
Uptimes » ${duration}
Ping » ${api}\`\`\``
          );
        m.edit(Embed);
      }
      if (emoji == "2️⃣") {
        let days = Math.floor(bot.uptime / 86400000);
        let hours = Math.floor(bot.uptime / 3600000) % 24;
        let minutes = Math.floor(bot.uptime / 60000) % 60;
        let seconds = Math.floor(bot.uptime / 1000) % 60;
        let max = 10;
        let cpu = Math.round(process.cpuUsage().system);
        let cpupercent = Math.round((cpu * max) / 100000 / 10);
        if (isNaN(cpupercent)) cpupercent = 0;
        let ClientTag = bot.user.tag;

        let embed1 = new Djs.MessageEmbed()

          .setColor("BLUE")
          .setTitle("Bot Statistic")
          .setFooter("Powered By » NPM | Discord | Node | Glitch.com")
          .addField(
            ":robot: Info",
            `\`\`\`• Bot Name » ${bot.user.tag}\n• Developer  »  RaykujanK13\`\`\``
          )
          .addField(
            ":gear: System",
            `\`\`\`• Langs » Node.js - v11.14.0\n• Libs » Discord.js - v12.2.0\`\`\``
          )
          .addField(":gear: CPU", `\`\`\`Intel Xeon E5-2690 v3 2.60Ghz\`\`\``)
          .addField(
            ":bar_chart: Other",
            `\`\`\`• Arch » x64\n• Platform » linux\`\`\``
          );
        m.edit(embed1);
      }
      if(emoji == '🔴'){
        m.delete
      }
      return awaitReaction();
    }
    return awaitReaction();
  }
};
