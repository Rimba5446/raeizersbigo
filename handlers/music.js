const Discord = require("discord.js");
const ytdl = require("discord-ytdl-core");
let NIGHTCORE = [
  "-af",
  "asetrate=44100*1.6,aresample=44100,equalizer=f=40:width_type=h:width=50:g=10"
];
let ECHO = ["-af", "aecho=0.6:0.3:1000:0.5"];
const db = require("quick.db");

class Music {
  constructor(client) {
    this.client = client;
  }
  async handleVideo(video, message, voiceChannel, playlist = false, skip) {
    const serverQueue = this.client.queue.get(message.guild.id);
    const song = {
      id: video.id,
      title: Discord.Util.escapeMarkdown(video.title),
      url: `https://www.youtube.com/watch?v=${video.id}`,
      channel: {
        title: video.channel.title,
        id: video.channel.id,
        url: `https://youtube.com/channel/${video.channel.id}`
      },
      duration: video.duration,
      requestedBy: message.author,
      requestedAt: new Date(),
      requestedTimestamp: Date.now(),
      streamTime: 0
    };
    if (!serverQueue) {
      const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 75,
        playing: true,
        loop: false,
        bassboost: 0,
        vaporwave: false,
        nightcore: false,
        echo: false,
        pos: 0
      };
      this.client.queue.set(message.guild.id, queueConstruct);

      queueConstruct.songs.push(song);

      try {
        var connection = await voiceChannel.join();
        queueConstruct.connection = connection;
        let emb1 = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(
            `**joined voice channel** \`${queueConstruct.voiceChannel.name}\`**.**`
          );
        message.channel.send(emb1);
        await this.play(message.guild, queueConstruct.songs[0], skip, true);
      } catch (error) {
        console.error(error);
        this.client.queue.delete(message.guild.id);
        let emb2 = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`**Error:** \`\`\`${error.message}\`\`\``);
        return message.channel.send(emb2);
      }
    } else {
      serverQueue.songs.push(song);
      if (playlist) return;
      else {
        const Jam =
          serverQueue.songs[0].duration.hours < 10
            ? `0${serverQueue.songs[0].duration.hours}`
            : serverQueue.songs[0].duration.hours;
        const Menit =
          serverQueue.songs[0].duration.minutes < 10
            ? `0${serverQueue.songs[0].duration.minutes}`
            : serverQueue.songs[0].duration.minutes;
        const Detik =
          serverQueue.songs[0].duration.seconds < 10
            ? `0${serverQueue.songs[0].duration.seconds}`
            : serverQueue.songs[0].duration.seconds;

        const embed = new Discord.MessageEmbed()
          .setColor("#FFFF00")
          .setDescription(
            `:heavy_plus_sign: **| [${song.title}](${song.url})**`
          )
          .setFooter(
            `Requested by: ${song.requestedBy.tag}`,
            song.requestedBy.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp();
        message.channel.send(embed).catch(e => {});
      }
    }
    return;
  }
  async play(guild, song, skip = 0, first = false) {
    const serverQueue = this.client.queue.get(guild.id);
    if (!guild.me.voice.channel) {
      this.client.queue.delete(guild.id);
      serverQueue.voiceChannel.leave();
      let embed3 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(
          "⚠ **| I have leave the voice channel, Reason » due to inactivity!**"
        );
      return serverQueue.textChannel.send(embed3);
    }
    if (!song) {
      this.client.queue.delete(guild.id);
      serverQueue.voiceChannel.leave();
    }
    const stream = ytdl(song.url, {
      filter: "audioonly",
      quality: "highestaudio",
      highWaterMark: 1024 * 1024 * 10,
      seek: skip / 1000,
      bitrate: 512000,
      opusEncoded: true,
      encoderArgs: serverQueue.echo
        ? ECHO
        : serverQueue.nightcore
        ? NIGHTCORE
        : [
            "-af",
            serverQueue.vaporwave
              ? `asetrate=44100*0.8,aresample=44100,atempo=1.1`
              : `equalizer=f=40:width_type=h:width=50:g=${serverQueue.bassboost}`
          ]
    });
    serverQueue.songs[0].streamTime = serverQueue.songs[0].streamTime + skip;
    const dispatcher = serverQueue.connection
      .play(stream, {
        type: "opus"
      })
      .on("finish", reason => {
        if (serverQueue.loop == true) {
          serverQueue.songs[0].streamTime = 0; // reset to initial frame
          serverQueue.songs.push(serverQueue.songs.shift());
        } else if (serverQueue.loop == false) {
          db.subtract(`${guild.id}.queue.nomor`, 1);
          serverQueue.songs.shift();
        } else if (serverQueue.loop == "single") {
          serverQueue.songs[0].streamTime = 0;
          const shifed = serverQueue.songs.unshift();
          if (serverQueue.loop === "single") serverQueue.songs.push(shifed);
          serverQueue.songs.splice(shifed);
        }
        this.play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    serverQueue.dispatcher = dispatcher;
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);

    let embpl = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(
        `▶ **| Playing** \`${song.title}\` - **Now**, **Volume** \`${serverQueue.volume}\``
      );
    if (serverQueue.loop == false) {
      serverQueue.textChannel.send(embpl);
    } else if (serverQueue.loop == "single" || serverQueue.loop == true) {
      return null;
    } else if (first) {
      serverQueue.textChannel.send(embpl);
    }
  }
}

module.exports = Music;