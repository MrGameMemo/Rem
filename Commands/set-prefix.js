const Discord = require ('discord.js');

module.exports.run = (client, message, args) => {
    if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) { return message.channel.send(client.lang.permUser); }
    if(!args[0]) return message.channel.send(client.lang.setPreixArgs)

    client.con.query(`UPDATE guild SET prefix='${args[0]}' WHERE id='${message.guild.id}'`)

    message.channel.send(client.lang.setPrefix + args[0])
}

module.exports.help = {
    name: "set-prefix",
    cooldown: 20
}