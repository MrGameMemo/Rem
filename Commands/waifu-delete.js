const Discord = require ('discord.js');

module.exports.run = (client, message, args) => {
  const filter = m => m.author.id === message.author.id
  const collector = message.channel.createMessageCollector(filter, { max: 1});
  message.channel.send(client.lang.waifuDeleteWelc)
  
  collector.on('collect', m => {
    client.con.query(`SELECT * from waifu WHERE name='${m.content}'`, (err, rows) => {
        console.log(rows)
        if(rows.some(i => i.name.toLowerCase() === m.content.toLowerCase())){
            message.channel.send(`${m.content} est maintenant en supprimé !`)
            client.con.query(`DELETE FROM waifu WHERE name="${m.content}"`)
        }else{
            message.channel.send(client.lang.waifuDeleteNotexist)
            return;
        }
    })
  });

}
module.exports.help = {
    name: "waifu-delete",
    cooldown: 0
}