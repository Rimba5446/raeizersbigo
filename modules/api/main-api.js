const { Client, Collection } = require('discord.js')
const player = require('../handler/music.js')
const fs = require('fs')

class Main_API extends Client {
  constructor(options){
    super(options);
    this.health = Object.seal({
      cpu: new Array(96).fill(0),
      prc: new Array(96).fill(0),
      ram: new Array(96).fill(0),
      cmd: new Array(96).fill(0),
      pings: new Array(96).fill(0)
    });
    
    this.queue = new Collection();
    this.player = new player(this);
    this.db = require('quick.db')
    this.config = require('../Data/Conf')
    this.commands = new Collection()
    this.aliases = new Collection()
    this.categories = fs.readdirSync("./Commands/");
  }
    updateStats() {
    const { heapTotal, heapUsed } = process.memoryUsage();
    const { loadavg } = require("os");
    this.health.cpu.shift();
    this.health.cpu.push(((loadavg()[0] * 10000) | 0) / 100);

    this.health.prc.shift();
    this.health.prc.push(((100 * (heapTotal / 1048576)) | 0) / 100);

    this.health.ram.shift();
    this.health.ram.push(((100 * (heapUsed / 1048576)) | 0) / 100);

    this.health.cmd.shift();
    this.health.cmd.push(0);
  }
}

exports.API = Main_API;