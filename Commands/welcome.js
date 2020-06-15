const Discord = require ('discord.js');

module.exports.run = (client, message, args) => {
    client.emit("guildMemberAdd", message.member);

}

module.exports.help = {
    name: "welcome",
    cooldown: 5,
    aliases: [""],
}