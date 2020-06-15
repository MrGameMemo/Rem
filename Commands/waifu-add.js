const Discord = require ('discord.js');

module.exports.run = (client, message, args) => {
  const filter = m => m.author.id === message.author.id
  const collector = message.channel.createMessageCollector(filter, { max: 1});
  message.channel.send(client.lang.waifuAddWelc)
  
  collector.on('collect', m => {

    client.con.query(`SELECT * from waifu WHERE name='${m.content}' `, (err, rows) => {
      //console.log(rows)
      if(rows.some(i => i.name === m.content)){
        message.channel.send(client.lang.waifuAddExist);
        return;
      }else{
        message.channel.send(`${m.content} est maintenant en vérification ! Merci à toi :))`)
        client.con.query(`INSERT INTO waifu (name, vote, checked, user, userID, lastName, image, anime, description) VALUES ('${m.content}','0', 'no', '${message.author.username}', '${message.author.id}', '0', '0', '0', '0')`)
     
      }
    })
 });
}
module.exports.help = {
    name: "waifu-add",
    cooldown: 25,
    category: 'waifu',
}