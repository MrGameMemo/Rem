const Discord = require ('discord.js');
const package = require('../package.json');
const fs = require('fs')
module.exports.run = (client, message, args) => {
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        const usedPour = Math.round(used * 100) / 100;
        discordjs = "discord.js";
        nodejs = process.version.replace(/v/g, '');

        fs.readdir('./Commands/', (error, f) => {
            if (error) { return console.error(error); }
                let commandes = f.filter(f => f.split('.').pop() === 'js');
                commandes.length;
        

        const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.lang.botInfoTitle}`)
            .addFields(
                { name: `\`${client.lang.botVersion}\``, value: `${package.version.toUpperCase()}`, inline: false},
                { name: `\`${client.lang.discordVersion}\``, value: `${package.dependencies["discord.js"]}`, inline: false},
                { name: `\`${client.lang.nodejsVersion}\``, value: `${nodejs}`, inline: false},
                { name: `\`${client.lang.ramUsing}\``, value: `${usedPour}MB`, inline: false},
                { name: `\`${client.lang.guildNumber}\``, value: `${client.guilds.cache.size}`, inline: false},
                { name: `\`${client.lang.commandNumber}\``, value: `${commandes.length}`, inline: false},
                )
        message.channel.send(embed)
    });
        

}

module.exports.help = {
    name: "botinfo",
    cooldown: 10,
    category: 'other',
    aliases: ['bot-info']
}