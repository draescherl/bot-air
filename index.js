/* Imports */
const discord = require('discord.js');

/* Fetch creds */
const { token } = require("./creds.json");

/* Bot init */
const client = new discord.Client;
client.once('ready', () => {
  console.log("AIR-BOT is online.");
  client.user.setActivity('RODR PD', { type: 'PLAYING' });
});


/* Temporary voice channel */
client.on('voiceStateUpdate', (oldMember, newMember) => {
  /* Delete channel once everybody has left */
  if (oldMember.channel != undefined) {
    if (oldMember.channel.name.startsWith("tmp")) {
      if (oldMember.channel.members.size == 0) {
        oldMember.channel.delete();
      }
    }
  }

  /* Create new channel once someone clicks on the trigger */
  if ((newMember.channel != undefined) && (newMember.channel.name === "Créer salon vocal")) {
    let channelName = "tmp" //+ newMember.channel.parentId.children.size - 1;
    newMember.guild.channels.create(channelName, {
      type: 'voice',
      parent: newMember.channel.parentID
    }).then(vc => {
      newMember.setChannel(vc);
    })
  }
});


/* Run bot */
client.login(token);