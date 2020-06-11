const Discord = require('discord.js');
let wChannel;
let WMsg;
module.exports = async (client, member, args) => {


    client.con.query(`SELECT welcomeC, welcomeMsg FROM guild WHERE id="${member.guild.id}"`, (err, rows) => {
        wChannel = rows[0].welcomeC;
        
        WMsg = rows[0].welcomeMsg;

        console.log(wChannel);
        wChannel = wChannel.replace(/>/g, '');
        wChannel = wChannel.replace(/<#/g, '');
        const channel = member.guild.channels.cache.find(channel => channel.id === wChannel);
        WMsg = WMsg.replace(/{user}/g, member.user)
        channel.send(WMsg)

    })



};