const Discord = require ('discord.js');
let embed;
let wC;
let channelWelcome;
module.exports.run = (client, message, args) => {

    if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) { return message.channel.send(client.lang.permUser); }

    const filter = m => m.author.id === message.author.id

    switch(args[0]){
        case 'welcome' :
            const collectorWelc = message.channel.createMessageCollector(filter, { max: 1});
            message.channel.send(client.lang.configWelcomeStepOne.replace(/{user}/g, `${message.author}`))
            collectorWelc.on('collect', m => {
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
                    message.channel.send(client.lang.configWelcomeFinal.replace(/{prefix}/g, `${message.prefix}`))
                })
            })
            
        break;

        case 'goodbye' :
            const collectorBye = message.channel.createMessageCollector(filter, { max: 1});
            message.channel.send(client.lang.configGoodbyeStepOne.replace(/{user}/g, `${message.author}`))
            collectorBye.on('collect', m => {
                client.con.query(`UPDATE guild SET goodByeC='${m.content}' WHERE id='${message.guild.id}'`)
                client.con.query(`SELECT goodByeC FROM guild WHERE id='${message.guild.id}'`, (err, rows) => {
                    channelGoodbye = rows[0].goodByeC;
                    message.channel.send(client.lang.configGoodbyeStepTwo.replace(/{channel}/g, `${channelGoodbye}`))
                })
                const filter = m => m.author.id === message.author.id
                const collector = message.channel.createMessageCollector(filter, { max: 1});
                collector.on('collect', m => {
                    client.con.query(`UPDATE guild SET goodByeMsg='${m.content}' WHERE id='${message.guild.id}'`)
                    message.channel.send(client.lang.configGoodbyeFinal.replace(/{prefix}/g, `${message.prefix}`))
                })
            })
            
        break;

        default :
        
        client.con.query(`SELECT * from guild WHERE id='${message.guild.id}' `, (err, rows) => {
            wC = rows[0].welcomeC;
            wC = wC.replace(/>/g, '');
            wC = wC.replace(/<#/g, '');

        if(client.guildID === "644238052062920705"){
                    wC = rows[0].welcomeC;
        }else {
            if(wC === '644253646925725706'){
                wC = client.lang.undefined;
                
            }else {
            wC = rows[0].welcomeC;
            //console.log(wC)
            }
        }
            
        const embed = new Discord.MessageEmbed()
        .setTitle(`${client.lang.configTW}`)
        .setDescription(`
        \`${client.lang.welcomeTitle}\`
        
            - ${message.prefix}config welcome (${wC})

        \`${client.lang.goodByeTitle}\`

            - ${message.prefix}config goodbye
        `) 
            message.channel.send(embed)
        })

        break;
    }


}

module.exports.help = {
    name: "config",
    cooldown: 5,
    category: 'customize',
    aliases: ["configuration"],
}