const Discord = require ('discord.js');

module.exports.run = (client, message, args) => {

    message.channel.send(client.lang.amvCommand)

}

module.exports.help = {
    name: "amv",
    cooldown: 3
}