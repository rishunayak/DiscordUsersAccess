require("dotenv").config()
const Discord = require('discord.js');

const token = "MTE0Mzk0NzYzMDMwNTYwNzczMQ.GHbWvz.pGTNlg3YSH5SbPr_oEbSS0kln8aCUhPz6wRCnc"



const intents = new Discord.Intents([
  Discord.Intents.FLAGS.GUILDS,
  Discord.Intents.FLAGS.GUILD_MEMBERS,
  Discord.Intents.FLAGS.GUILD_MESSAGES,
]);




function initializeClient() {
  const client = new Discord.Client({ intents }); 

  client.once('ready', async () => {
   console.log('Bot is ready.');
})


client.on('message', async (message) => { 
 
 
    if (message.content.startsWith('!user')) { 
      if (message.member.permissions.has('ADMINISTRATOR')) {
        try {
          const guild = message.guild;
          const content = message.content.substring('!dm'.length).trim(); 

          const attachment = message.attachments.first();
          const image = attachment ? attachment.url : null;
          const newGuild = await client.guilds.fetch(guild.id);
          if (newGuild) {

      

    try {
      
      await newGuild.members.fetch({ force: true }); 

      for (const [memberId, member] of newGuild.members.cache) { 
        if (!member.user.bot && memberId !== client.user.id &&  member.roles.cache.some((role) => role.name === "USER")) {
          try {
            const options = { 
              content: `Hey ${member}, \n\n **XD BYPASS** \n\n  **${content}** \n\n`};
          
            if (image) {
              options.files = [image];
            }

            await member.send(options);
            message.reply(`Sent DM to ${member.user.tag}`);
            await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 9) + 1)*1000); 
            messageCount++;
            
          } catch (error) {
            
            message.reply(`Failed to send DM to ${member.user.tag}: ${error}`); 
          }
        }
      }

      message.reply(`Total members: ${newGuild.members.cache.size}`);
    } catch (error) { 
      message.reply('Error fetching members:', error);
    }
  } else {
    message.reply('Guild not found.');
  }

          
     
  
          message.reply('Successfully Dm all Users');
        } catch (error) {
            message.reply('Error fetching members:', error);
        }
      } else {
        message.reply('You do not have permission to use this command.'); 
      }
    }
  });

  client.login(token)
    .then(() => console.log('Client logged in with token:', token)) 
    .catch((error) => console.error('Client login error:', error));

}

  initializeClient();


  
