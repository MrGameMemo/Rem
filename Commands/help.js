const Discord = require("discord.js");
const fs = require('fs')

module.exports.run = async (client, message, args) => {
            const embed = new Discord.MessageEmbed()
            .setTitle(client.lang.helpTitle)
            .addFields(

            //{name: `**${client.lang.modTitle}**`, value: `${client.commands.filter(cmd => cmd.help.category === 'mod').map(cmd => `\`${cmd.help.name}\``).join(" | ")}`},
            //{name: `${client.lang.funTitle}`, value: `${client.commands.filter(cmd => cmd.help.category === 'fun').map(cmd => `\`${cmd.help.name}\``).join(" | ")}`},
            {name: `**${client.lang.waifuTitle}**`, value: `${client.commands.filter(cmd => cmd.help.category === 'waifu').map(cmd => `\`${cmd.help.name}\``).join(" | ")}`},
            {name: `**${client.lang.customTitle}**`, value: `${client.commands.filter(cmd => cmd.help.category === 'customize').map(cmd => `\`${cmd.help.name}\``).join(" | ")}`},
            {name: `**${client.lang.otherTitle}**`, value: `${client.commands.filter(cmd => cmd.help.category === 'other').map(cmd => `\`${cmd.help.name}\``).join(" | ")}`},

            )


            message.channel.send(embed);

}


module.exports.help = {
    name: "help",
    cooldown: 5,
    category: "other",
    aliases: [""],
}