const Discord = require ('discord.js');
const owner = require('../Config/owner')
module.exports.run = (client, message, args) => {
  if (message.author.id !== owner.id){return message.channel.send(client.lang.notOwner);}
  const filter = m => m.author.id === message.author.id

  const collector = message.channel.createMessageCollector(filter, { max: 1, time: 15000 });

  client.con.query(`SELECT * FROM waifu WHERE checked = 'no'`, (err, rows) => {

    message.channel.send(client.lang.waifuVerifW)

    const embed = new Discord.MessageEmbed()
    .setAuthor(client.lang.waifuVerifAut)
    .setDescription(`${rows.map((i) => `\n- **${client.lang.waifuListName}** \`${i.name}\``).join('')}`)

    message.channel.send(embed)
  })
  
  collector.on('collect', m => {

    message.channel.send(`${m.content} ${client.lang.waifuVerifChecked}`)
    client.con.query(`UPDATE waifu SET checked='yes' WHERE name="${m.content.toLowerCase()}"`)

  });
  
  collector.on('end', collected => {

    //console.log(client.lang.waifuTimeOuted);
    
  });
}
module.exports.help = {
    name: "waifu-verif",
    cooldown: 0,
    aliases: [""],
}