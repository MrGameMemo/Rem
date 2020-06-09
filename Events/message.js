const Discord = require('discord.js');
const mysql = require('mysql')
let cooldown = new Set();
const fs = require('fs')
const owner = require ('../Config/owner')


module.exports = (client, message) => {


    client.con.query(`SELECT prefix FROM guild WHERE id=${message.guild.id}`, (err, rows) => {
    const prefix = rows[0].prefix;

    if (message.content.startsWith(prefix)) { 
        if(cooldown.has(message.author.id)) {
            message.delete;
            message.reply(`Un délai de ${cdseconds} secondes est requis entre chaque exécution`);
            return;
        }
    }

    if (message.author.bot || message.channel.type === 'dm') { return; }
    if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) { return; }


    if (!message.content.startsWith(prefix)) { return; }

        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let commande = args.shift();
        let cmd = client.commands.get(commande);

        if (cmd) { 
            cmd.run(client, message, args);

            console.log(cmd.help.cooldown)

            cdseconds = cmd.help.cooldown

            if(message.author.id === owner.id) { return; }
            cooldown.add(message.author.id);

            
            setTimeout(() => {
                cooldown.delete(message.author.id)
            }, cdseconds*1000)
        }else {
            return; 
        }
    });
};
