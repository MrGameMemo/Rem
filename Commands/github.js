const Discord = require ('discord.js');

module.exports.run = (client, message, args) => {

    message.channel.send('Voici le github de mon créeateur (le best) : https://github.com/PseudoIllyes')
}

module.exports.help = {
    name: "github",
    cooldown: 6
}