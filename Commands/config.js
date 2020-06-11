const Discord = require ('discord.js');
let embed;
let prefix;
let channelWelcome;
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

    switch(args[0]){
        case 'welcome' :
            const filter = m => m.author.id === message.author.id
            const collector = message.channel.createMessageCollector(filter, { max: 1});
            message.channel.send(client.lang.configWelcomeStepOne.replace(/{user}/g, `${message.author}`))
            collector.on('collect', m => {
                client.con.query(`UPDATE guild SET welcomeC='${m.content}' WHERE id='${message.guild.id}'`)
                client.con.query(`SELECT welcomeC FROM guild WHERE id='${message.guild.id}'`, (err, rows) => {
                    //console.log(rows[0].welcomeC)
                    channelWelcome = rows[0].welcomeC;
                    message.channel.send(client.lang.configWelcomeStepTwo.replace(/{channel}/g, `${channelWelcome}`))
                })
                const filter = m => m.author.id === message.author.id
                const collector = message.channel.createMessageCollector(filter, { max: 1});
                collector.on('collect', m => {
                    client.con.query(`UPDATE guild SET welcomeMsg='${m.content}' WHERE id='${message.guild.id}'`)
                    message.channel.send(client.lang.configWelcomeFinal.replace(/{prefix}/g, `${prefix}`))
                })
            })
            
        break;

        default : 
            message.channel.send(embed)
        break;
    }


}

module.exports.help = {
    name: "config",
    cooldown: 5
}