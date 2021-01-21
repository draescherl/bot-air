/* Imports */
const discord = require('discord.js');

/* Fetch creds */
const { token } = require('./creds.json');

/* Bot init */
const client = new discord.Client;
client.once('ready', () => {
  console.log('AIR-BOT is online.');
  client.user.setActivity('RODR PD', { type: 'PLAYING' });
});


/* Temporary voice channel */
client.on('voiceStateUpdate', (oldMember, newMember) => {
  
  /* Delete channel once everybody has left */
  if (oldMember.channel != undefined) {
    if (oldMember.channel.name.startsWith('tmp')) {
      if (oldMember.channel.members.size == 0) {
        oldMember.channel.delete();
      }
    }
  }

  /* Create new channel once someone clicks on the trigger */
  if (newMember.channel != undefined) {
    if (newMember.channel.name === 'Créer salon vocal') {    
      let category = newMember.guild.channels.cache.find(c => c.id = newMember.channel.parentID);
      let children = category.children.size;
      let channelName = 'tmp - ' + children.toString();
      newMember.guild.channels.create(channelName, {
        type: 'voice',
        parent: newMember.channel.parentID
      }).then(vc => {
        newMember.setChannel(vc);
      })
    }
  }

});


/* Run bot */
client.login(token);