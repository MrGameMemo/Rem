const Discord = require ('discord.js');
let embed;
module.exports.run = (client, message, args) => {

    client.con.query(`SELECT * from waifu WHERE checked = 'yes' `, (err, rows) => {
    console.log(rows)
        if(!rows[0]){
            console.log(rows)
            embed = new Discord.MessageEmbed()
            .setAuthor(client.lang.waifuListAut)
            .setDescription(`${client.lang.waifuListError}`)
            .setColor(`#f9ca24`)
        }
        else {
            embed = new Discord.MessageEmbed()
            .setAuthor(client.lang.waifuListAut)
            .setDescription(`${rows.map((i) => `\n- **${client.lang.waifuListName}** \`${i.name}\` |  **${client.lang.waifuListVote}** \`${i.vote}\`\n\n`).join('')}`)
            .setColor(`#f9ca24`)
        }

        message.channel.send(embed)
    })

}

module.exports.help = {
    name: "waifu-list",
    cooldown: 5
}