const Discord = require ('discord.js');

module.exports.run = (client, message, args) => {

    message.channel.send(client.lang.inviteC)
}

module.exports.help = {
    name: "invite",
    cooldown: 2,
    category: "ohter",
}