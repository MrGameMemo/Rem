const Discord = require('discord.js');
const mysql = require('mysql')
const cooldowns = new Map();
const fs = require('fs')
const owner = require ('../Config/owner')
const humanizeDuration = require('humanize-duration');

module.exports = (client, message) => {

    client.con.query(`SELECT prefix FROM guild WHERE id=${message.guild.id}`, (err, rows) => {
    const prefix = rows[0].prefix;
    message.prefix = prefix;

    if (message.content.startsWith(prefix)) { 
        if(cooldowns.has(message.author.id, message.content)) {
            const cooldown = cooldowns.get(message.author.id);
            const remaining = cooldown - Date.now();
            const content = cooldowns.get(message.content);
            if(content === message.content){
            message.delete;
            const msg = client.lang.cooldown.replace(/{cds}/g, `\`${humanizeDuration(remaining, { language: "fr" })}\``)
            message.reply(`${msg}`);
            return;
            }
        }
    }

    if (message.author.bot || message.channel.type === 'dm') { return; }
    if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) { return; }


    if (!message.content.startsWith(prefix)) { return; }

        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let commande = args.shift().toLowerCase();
        let cmd = client.commands.get(commande);

        if (cmd) { 
            cmd.run(client, message, args);

            //console.log(cmd.help.cooldown)

            cdseconds = cmd.help.cooldown

            if(message.author.id === owner.id) { return; }
            cooldowns.set(message.author.id, Date.now() + cdseconds*1000);
            cooldowns.set(message.content, prefix + cmd.help.name)
            console.log(cooldowns)

            
            setTimeout(() => {
                cooldowns.delete(message.author.id);
                cooldowns.delete(message.content);
            }, cdseconds*1000)
        }else {
            return; 
        }
    });
};
