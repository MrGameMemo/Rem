const Discord = require ('discord.js');

module.exports.run = (client, message, args) => {

    let fr = message.guild.roles.cache.find(role => role.name === "🇫🇷 Français");

    message.channel.send('Voici le github de mon créeateur (le best) : https://github.com/PseudoIllyes')
}

module.exports.help = {
    name: "github"
}