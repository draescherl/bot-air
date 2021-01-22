/* Imports */
const discord = require('discord.js');

/* Fetch creds and config */
const { token } = require('./creds.json');
const { prefix, trigger, probability } = require('./config.json');

/* Function to fetch and return current time and date */
function logDate() {
  let currentdate = new Date(); 
  let datetime = '[' + currentdate.getDate()        + '/'
                     + (currentdate.getMonth() + 1) + '/' 
                     + currentdate.getFullYear()    + ' @ '  
                     + currentdate.getHours()       + ':'  
                     + currentdate.getMinutes()     + ':' 
                     + currentdate.getSeconds()     + '] ';
  return(datetime.toString());
}

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
    if (oldMember.channel.name.startsWith(prefix)) {
      if (oldMember.channel.members.size == 0) {
        console.log(logDate() + 'Temporary channel \'' + oldMember.channel.name + '\' is now empty. Deleting.');
        oldMember.channel.delete();
      }
    }
  }

  /* Create new channel once someone clicks on the trigger */
  if (newMember.channel != undefined) {
    if (newMember.channel.name === trigger) {    
      console.log(logDate() + 'User \'' + newMember.member.user.username + '\' just connected to a trigger channel.');

      /* Create channel name */
      let category = newMember.guild.channels.cache.find(c => c.id = newMember.channel.parentID);
      let number = 0;
      category.children.forEach(c => {
        if (c.type == 'voice') { number++; }
      });
      let channelName = prefix + number.toString();
      
      /* Create channel and move user to it */
      console.log(logDate() + 'Creating channel \'' + channelName + '\'.');
      newMember.guild.channels.create(channelName, {
        type: 'voice',
        parent: newMember.channel.parentID
      }).then(vc => {
        console.log(logDate() + 'Moving \'' + newMember.member.user.username + '\' to temporary voice channel \'' + newMember.channel.name + '\'.');
        newMember.setChannel(vc);
      });
    }
  }

});


/* Message troll */
client.on('message', msg => {
  if (msg.content.toLowerCase().includes('di')) {
    console.log(logDate() + 'Found a message with \'di\' in it: ' + msg.cleanContent);
    if (Math.random() < probability) {
      console.log(logDate() + 'It\'s your lucky day, this message was chosen to be the one.')
      let words = msg.content.split(' ');
      let word = '';
      words.forEach(w => {
        if (w.toLowerCase().includes('di')) { word = w }
      });
      word = word.split('di').pop();
      msg.channel.send(word);
    }
  }
});


/* Run bot */
client.login(token);