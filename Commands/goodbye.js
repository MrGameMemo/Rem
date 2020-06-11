const Discord = require ('discord.js');

module.exports.run = (client, message, args) => {
    client.emit("guildMemberRemove", message.member);

}

module.exports.help = {
    name: "goodbye",
    cooldown: 5
}