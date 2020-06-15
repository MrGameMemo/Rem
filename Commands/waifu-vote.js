const Discord = require ('discord.js');
const owner = require('../Config/owner')
module.exports.run = (client, message, args) => {
  const filter = m => m.author.id === message.author.id

  const collector = message.channel.createMessageCollector(filter, { max: 1});

  client.con.query(`SELECT * FROM waifu WHERE checked = 'yes'`, (err, rows) => {

    message.channel.send(client.lang.waifuVoteW)

    embed = new Discord.MessageEmbed()
    .setAuthor(client.lang.waifuListAut)
    .setDescription(`${rows.map((i) => `\n- **${client.lang.waifuListName}** \`${i.name}\` |  **${client.lang.waifuListVote}** \`${i.vote}\`\n\n`).join('')}`)
    .setColor(`#f9ca24`)

    message.channel.send(embed)
  })
  
  collector.on('collect', m => {

    message.channel.send(`${client.lang.waifuVoteSuccess}`)
    client.con.query(`UPDATE waifu SET vote = vote + 1 WHERE name="${m.content.toLowerCase()}"`)

  });
  
  collector.on('end', collected => {

    //console.log(client.lang.waifuTimeOuted);
    
  });
}
module.exports.help = {
    name: "waifu-vote",
    cooldown: 3600,
    category: 'waifu',
    aliases: [""],
}