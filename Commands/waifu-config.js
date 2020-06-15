const Discord = require ('discord.js');
const owner = require('../Config/owner')
module.exports.run = (client, message, args) => {
  if (message.author.id !== owner.id){return message.channel.send(client.lang.notOwner);}
  const filter = m => m.author.id === message.author.id

  const collector = message.channel.createMessageCollector(filter, { max: 1});


    message.channel.send(client.lang.waifuConfigW)


  
  collector.on('collect', m => {
    client.con.query(`SELECT * FROM waifu`, (err, rows) => {
      if(!rows.some(i => i.name.toLowerCase() === m.content.toLowerCase())){
        message.channel.send(`${client.lang.waifuConfigNotCreate}`)
        return;
      }else{
        client.con.query(`SELECT * FROM waifu WHERE name='${m.content}'`, (err, rows) => {

          message.channel.send(`${client.lang.waifuConfigStep2}`)

          const collector = message.channel.createMessageCollector(filter, { max: 1});
    
          collector.on('collect', (m) => {

              /* Nom */
              if(m.content.toLowerCase() === `${client.lang.waifuConfigName}`.toLowerCase()){

                  message.channel.send(`${client.lang.waifuConfigNameFirst}`)
                  const collector = message.channel.createMessageCollector(filter, { max: 1});
                  collector.on('collect', (m) => {
                    client.con.query(`UPDATE waifu SET name='${m.content}' WHERE name='${rows[0].name}'`)
                    message.channel.send(`${client.lang.waifuConfigNameSeg}`)

                })
              }

              /* Description */

              if(m.content.toLowerCase() === `${client.lang.waifuConfigDesc}`.toLowerCase()){

                message.channel.send(`${client.lang.waifuConfigDescFirst}`)
                const collector = message.channel.createMessageCollector(filter, { max: 1});
                collector.on('collect', (m) => {
                  client.con.query(`UPDATE waifu SET description='${m.content}' WHERE name='${rows[0].name}'`)
                  message.channel.send(`${client.lang.waifuConfigDescSeg}`)
                  
              })
            }
            
            /* Photo */
            if(m.content.toLowerCase() === `${client.lang.waifuConfigPhoto}`.toLowerCase()){

              message.channel.send(`${client.lang.waifuConfigPhotoFirst}`)
              const collector = message.channel.createMessageCollector(filter, { max: 1});
              collector.on('collect', (m) => {
                client.con.query(`UPDATE waifu SET image='${m.content}' WHERE name='${rows[0].name}'`)
                message.channel.send(`${client.lang.waifuConfigPhotoSeg}`)
                
            })
          }

          /* Anime */

          if(m.content.toLowerCase() === `${client.lang.waifuConfigAnime}`.toLowerCase()){

            message.channel.send(`${client.lang.waifuConfigAnimeFirst}`)
            const collector = message.channel.createMessageCollector(filter, { max: 1});
            collector.on('collect', (m) => {
              client.con.query(`UPDATE waifu SET anime='${m.content}' WHERE name='${rows[0].name}'`)
              message.channel.send(`${client.lang.waifuConfigAnimeSeg}`)
              
          })
        }
          })
      
        })
      }
    })

  });

}
module.exports.help = {
    name: "waifu-config",
    cooldown: 0,
    aliases: [""],
}