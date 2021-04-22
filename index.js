const { token } = require("./config.json");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, default_prefix } = require("./util/Util");
const discord = require("discord.js"); 
const client = new discord.Client({
  disableEveryone: true 
});

client.commands = new discord.Collection();
client.prefix = default_prefix;
client.queue = new Map();
client.aliases = new discord.Collection();
const cooldowns = new Collection();

//--------MUSIC - CLIENT------
const { Player } = require('discord-player');
const fs = require("fs")
client.player = new Player(client);

/**
 * Client Events 1
 */
//client.on("ready", () => {
  //console.log(`${client.user.username} ready!`);
  //client.user.setActivity(`RaeiZers r/help`, { type: "PLAYING" });
//});
//client.on("warn", (info) => console.log(info));
//client.on("error", console.error);


//Client Events 2 

client.on("ready", async () => {
  console.log(`${client.user.username} Ready!`);
  client.user
    .setActivity(`Guilds : ${await client.guilds.cache.size} | r/help | r/about | r/invite |`, { type: "PLAYING" })
    .catch(error => console.log(error));
});

["command", "events"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of player) {
    //console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
  };

client.login(TOKEN);