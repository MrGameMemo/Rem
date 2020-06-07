const Discord = require('discord.js')
const fs = require('fs')
const logger = require("./Config/logger");
const token = require("./token.js").token;
const client = new Discord.Client()
const mysql = require('mysql');
const db = require('./Config/db.js')


client.login(token).then(logger.log('Bot On', 'log'))

client.commands = new Discord.Collection();

fs.readdir('./Commands/', (error, f) => {
    if (error) { return console.error(error); }
        let commandes = f.filter(f => f.split('.').pop() === 'js');
        if (commandes.length <= 0) { return logger.log('Aucune commande DEV trouvée !', 'error'); }

        commandes.forEach((f) => {
            let commande = require(`./Commands/${f}`);
            logger.log(`ALL | ${f} commande chargée !`, 'info');
            client.commands.set(commande.help.name, commande);
            client.cooldown = commande.help.cooldown;
        });
});

fs.readdir('./Events/', (error, f) => {
    if (error) { return console.error(error); }
    let event = f.filter(f => f.split('.').pop() === 'js');
    if (event.length <= 0) { return logger.log('Aucun event trouvée !', 'error'); }else{
        logger.log(`${f.length} events chargés`, 'info');}

        f.forEach((f) => {
            let events = require(`./Events/${f}`);
            let event = f.split('.')[0];
            client.on(event, events.bind(null, client));
        });
});

client.con = mysql.createConnection({
    host : db.host,
    user: db.user,
    password: db.password,
    database: db.name
})

client.con.connect(err => {
    if(err) throw err;
    console.log('Connecté à la db')
})

client.on('guildCreate', guild => {
    client.con.query(`INSERT INTO guild (id, prefix) VALUES ('${guild.id}', 'r!')`)
})