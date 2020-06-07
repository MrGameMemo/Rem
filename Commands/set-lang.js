const Discord = require ('discord.js');

module.exports.run = (client, message, args) => {
    if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) { return message.channel.send(client.lang.permUser); }
    if(!args[0]) return message.channel.send(client.lang.setLangArgs)

    client.con.query(`UPDATE guild SET lang='${args[0]}' WHERE id='${message.guild.id}'`)

    message.channel.send(client.lang.setLang + args[0])
}

module.exports.help = {
    name: "set-lang",
    cooldown: 5
}