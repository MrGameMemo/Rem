const Discord = require ('discord.js');
let embed;
let prefix;
module.exports.run = (client, message, args) => {

    if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) { return message.channel.send(client.lang.permUser); }

    client.con.query(`SELECT prefix from guild WHERE id='${message.guild.id}' `, (err, rows) => {
        prefix = rows[0].prefix;
    })

    const embed = new Discord.MessageEmbed()
    .setTitle(`${client.lang.configTW}`)
    .setDescription(`
    \`${client.lang.welcomeTitle}\`
    
        - ${prefix}config welcome

    \`${client.lang.goodByeTitle}\`

        - ${prefix}config goodbye
    `)

    message.channel.send(embed)
}

module.exports.help = {
    name: "config",
    cooldown: 5
}