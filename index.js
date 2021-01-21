/* Imports */
const discord = require('discord.js');
const fs = require('fs');

const client = new discord.Client;
client.commands = new discord.Collection();

/* Log on bot start */
client.once('ready', () => {
  console.log("AIR-BOT is online.");
  client.user.setActivity('RODR PD', { type: 'PLAYING' });
});

/* Fetch creds */
var contents = fs.readFileSync("creds.JSON");
var creds = JSON.parse(contents);

/* Run bot */
client.login(creds.token);