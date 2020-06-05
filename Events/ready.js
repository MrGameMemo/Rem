const { Client, Attachment } = require('discord.js');
const logger = require("../Config/logger");


  module.exports = async (client) => {
    
    // Update the game every 20s
    const status = require("../Config/config.js").status;
    let i = 0;
    setInterval(function(){
        let toDisplay = status[parseInt(i, 10)].name.replace("{serversCount}", client.guilds.cache.size)+"";
        client.user.setActivity(toDisplay, {type: status[parseInt(i, 10)].type, url: status[parseInt(i, 10)].url});
        if(status[parseInt(i+1, 10)]) i++
        else i = 0;
    }, 20000); // Every 20 seconds
  }