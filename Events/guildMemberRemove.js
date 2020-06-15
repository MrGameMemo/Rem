const Discord = require('discord.js');
let gChannel;
let gMsg;
module.exports = async (client, member, args) => {


    client.con.query(`SELECT goodByeC, goodByeMsg FROM guild WHERE id="${member.guild.id}"`, (err, rows) => {
        gChannel = rows[0].goodByeC;
        
        gMsg = rows[0].goodByeMsg;

        //console.log(gChannel);
        gChannel = gChannel.replace(/>/g, '');
        gChannel = gChannel.replace(/<#/g, '');
        const channel = member.guild.channels.cache.find(channel => channel.id === gChannel);
        
        if (gMsg.includes('{count}') && gMsg.includes('{user}')){
            gMsg = gMsg.replace(/{count}/g, member.guild.memberCount)
            gMsg = gMsg.replace(/{user}/g, member.user)
        }
        else if(gMsg.includes('{user}')){
            gMsg = gMsg.replace(/{user}/g, member.user)
        }else if (gMsg.includes('{count}')) {
            gMsg = gMsg.replace(/{count}/g, member.guild.memberCount)
        } 
        
        channel.send(gMsg)

    })



};