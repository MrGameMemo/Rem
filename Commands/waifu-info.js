const Discord = require ('discord.js');
let prefix;
module.exports.run = (client, message, args) => {

    client.con.query(`SELECT prefix from guild WHERE id='${message.guild.id}' `, (err, rows) => {
        prefix = rows[0].prefix;
    })

    if(!args[0]) return message.channel.send(`${client.lang.waifuInfoArgs}${message.prefix}waifu-list)\``)

    client.con.query(`SELECT * from waifu WHERE name='${args[0]}' `, (err, rows) => {


    if(rows.some(i => i.name.toLowerCase() === args[0].toLowerCase())){

        const embed = new Discord.MessageEmbed()
        .setTitle(`${rows[0].name}`)
        .setColor(`#7ed6df`)
        .setDescription(`__${client.lang.waifuInfoName}__ : **${rows[0].name}**\n__${client.lang.waifuInfoVote}__ : **${rows[0].vote}**\n__${client.lang.waifuInfoAnime}__ : ${rows[0].anime}\n__${client.lang.waifuInfoDesc}__ : ${rows[0].description}`)
        .setImage(`${rows[0].image}`)

        message.channel.send(embed)
        //console.log(rows)
    }
    else {
        return message.channel.send(`${client.lang.waifuInfoArgsNotF} ${message.prefix}waifu-add)\``);
    }

    })


}

module.exports.help = {
    name: "waifu-info",
    cooldown: 5,
    category: 'waifu',
    aliases: [""],
}