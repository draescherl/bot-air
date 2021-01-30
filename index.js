/* ------------------------------------------------------------------------ */
/*                      Imports and requirements                            */
/* ------------------------------------------------------------------------ */
const discord   = require('discord.js');
const { token } = require('./creds.json');
const { prefix, trigger, probability } = require('./config.json');


/* ------------------------------------------------------------------------ */
/*                          Utility functions                               */
/* ------------------------------------------------------------------------ */
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


/* ------------------------------------------------------------------------ */
/*                        Bot initialisation                                */
/* ------------------------------------------------------------------------ */
const client = new discord.Client;
client.once('ready', () => {
  console.log(logDate() + 'AIR-BOT is online.');
  client.user.setActivity('RODR PD', { type: 'PLAYING' });
});


/* ------------------------------------------------------------------------ */
/*                         Temporary voice channel                          */
/* ------------------------------------------------------------------------ */
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
      let channelName = prefix + ' de ' + newMember.member.user.username;
      
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


/* ------------------------------------------------------------------------ */
/*                           Reacting to messages                           */
/* ------------------------------------------------------------------------ */
// client.on('message', msg => {
//   if (msg.content.toLowerCase().includes('di')) {
    
//     /* Bot repeats the characters after di (say in French) */
//     console.log(logDate() + 'Found a message with \'di\' in it: ' + msg.cleanContent);
//     if (Math.random() < probability) {
//       let words = msg.content.split(' ');
//       let word = '';
//       words.forEach(w => {
//         if (w.toLowerCase().includes('di')) { word = w }
//       });
//       /* Prevent the bot from being triggered if someone says just 'di' */
//       if (word.length > 2) {
//         console.log(logDate() + 'It\'s your lucky day, this message was chosen to be the one.')
//         word = word.split('di').pop();
//         msg.channel.send(word);
//       }
//     }

//   } else if (msg.content.toLowerCase().includes('cri')) {
    
//     /* Bot shouts the characters after cri (shout in French) */
//     console.log(logDate() + 'Found a message with \'cri\' in it: ' + msg.cleanContent);
//     if (Math.random() < probability) {
//       let words = msg.content.split(' ');
//       let word = '';
//       words.forEach(w => {
//         if (w.toLowerCase().includes('cri')) { word = w }
//       });
//       /* Prevent the bot from being triggered if someone says just 'cri' */
//       if (word.length > 3) {
//         console.log(logDate() + 'It\'s your lucky day, this message was chosen to be the one.');
//         word = word.split('cri').pop();
//         word = word.toUpperCase() + ' !';
//         msg.channel.send(word);
//       }
//     }

//   }
// });


/* ------------------------------------------------------------------------ */
/*                               Run bot                                    */
/* ------------------------------------------------------------------------ */
client.login(token);