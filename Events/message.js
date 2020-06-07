const Discord = require('discord.js');
const SQL = require('mysql')
const prefix = 'r!';
let cooldown = new Set();

module.exports = (client, message) => {
    let cdseconds = client.cooldown;
    if (message.author.bot || message.channel.type === 'dm') { return; }
    if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) { return; }
    if(cooldown.has(message.author.id)) {
        message.delete;
        message.reply(`Un délai de ${cdseconds} secondes est requis entre chaque exécution`);
        return;
    }
    setTimeout(() => {
        cooldown.delete(message.author.id)
    }, cdseconds*1000)
    if (!message.content.startsWith(prefix)) { return; }

        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let commande = args.shift();
        let cmd = client.commands.get(commande);

        cooldown.add(message.author.id)
        if (!cmd) { return; }
            cmd.run(client, message, args);
};
