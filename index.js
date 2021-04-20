const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"] });

//! Подключение файлов.
const settings = require('./code/configs/settings').settings;

//! Разработчики бота.
const dev = new Set()
dev.add(settings.developers);

//! Действия при запуске бота.
client.on('ready', async () => {
    require('./code/ready').start();
    const chat = client.guilds.cache.get('649963967220940821').channels.cache.find(c => c.id == '655559633477566464');
    const Embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`💎・Запуск бота`)
            .setDescription('**Бот включен!**')
            .setTimestamp()
            .setFooter(`Informal Helper | Michell Mahoney`, client.user.displayAvatarURL());
            chat.send(Embed)
})

//! Подключие MongoDB

/*const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://Roma:a1d1u1m11@helper.zvrrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }); mongoose.connection.on('connected', ()=>{ 
console.log('✅ | База данных успешно подключена!')
});*/

//! Действия при сообщении.
client.on('message', async (message) => {
    const prefix = settings.prefix;

    //* Команды.
    require('./code/commands/ping').commands(message, prefix);
    require('./code/commands/invite').commands(client, message, prefix);
    require('./code/commands/help').commands(message, prefix);
    require('./code/commands/moders').commands(message, prefix);
    require('./code/commands/clear').commands(client, message, prefix);
    require('./code/commands/infobot').commands(client, message, prefix);
    require('./code/commands/serverinfo.js').commands(client, message, prefix);
    require('./code/commands/user').commands(client, message, prefix);
    require('./code/commands/news').commands(client, message, prefix);
    require('./code/commands/avatar').commands(client, message, prefix);
    require('./code/commands/kick').commands(client, message, prefix);
    require('./code/commands/delrole').commands(client, message, prefix);
    require('./code/commands/weather').commands(client, message, prefix);
    require('./code/commands/mute').commands(client, message, prefix);
    require('./code/commands/members').commands(message, prefix);
    require('./code/commands/unmute').commands(client, message, prefix);

    //* Системы.
})

//! Действия при выдачи роли.
/*client.on('guildMemberUpdate', async (oldMember, newMember) => {
    require('./code/system/protection').system(client, oldMember, newMember);
})

//! Действия при удалении сообщения.
client.on('messageDelete', async (message) => {
    if (message.partial) await message.fetch();
    if (message.channel.partial) await message.channel.fetch();

    require('./code/system/logs-message').system(client, message);
})*/

/*client.on('guildMemberAdd', async (member) => {
    if (member.guild.id === "732164796795060266") {
        var role = member.guild.roles.cache.find(role => role.id === "784364508432695296");
        member.roles.add(role);
    }
})*/

client.login(process.env.TOKEN || settings.token);
