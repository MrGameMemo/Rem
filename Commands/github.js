const Discord = require ('discord.js');

module.exports.run = (client, message, args) => {

    message.channel.send(client.lang.githubC)
}

module.exports.help = {
    name: "github",
    cooldown: 2
}