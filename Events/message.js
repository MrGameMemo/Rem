const Discord = require('discord.js');
const mysql = require('mysql')
const cooldowns = new Map();
const fs = require('fs')
const owner = require ('../Config/owner')
const humanizeDuration = require('humanize-duration');


module.exports = (client, message, args) => {
    client.con.query(`SELECT prefix FROM guild WHERE id=${message.guild.id}`, (err, rows) => {
    const prefix = rows[0].prefix;
    message.prefix = prefix;

    if (message.content.startsWith(prefix)) { 
        
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let commande = args.shift().toLowerCase();
    let cmd = client.commands.get(commande) || client.commands.get(client.aliases.get(commande))
    const msgC = message.content.replace(message.content, prefix + cmd.help.name);

        if(cooldowns.has(message.author.id, message.content === msgC )) {
            
            const cooldown = cooldowns.get(message.author.id);
            const remaining = (cooldown - Date.now()) / 1000;
            const content = cooldowns.get(msgC);
            console.log(content)
            if(content === msgC){
            message.delete;
            const msg = client.lang.cooldown.replace(/{cds}/g, `\`${Number.parseFloat(remaining).toFixed(0)}\``)
            message.reply(`${msg}`);
            return;
            }
        }
    

        if (message.author.bot || message.channel.type === 'dm') { return; }
        if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) { return; }

            if (cmd) { 
                cmd.run(client, message, args);
                //console.log(cmd.help.cooldown)

                cdseconds = cmd.help.cooldown
                if(message.author.id === owner.id) { return; }
                cooldowns.set(message.author.id, Date.now() + cdseconds*1000);
                cooldowns.set(msgC, prefix + cmd.help.name)
                
                console.log(cooldowns)

                
                setTimeout(() => {
                    cooldowns.delete(message.author.id);
                    cooldowns.delete(msgC);
                }, cdseconds*1000)
            }else {
                return; 
            }
        }
    });
};
