const { MessageEmbed } = require("discord.js");

exports.commands = async (client, message, prefix) => {
    if (message.content.startsWith(`${prefix}developers`)) {

        //* Подключение настроек.
        const settings = require('../configs/settings').settings;
        if (!settings) return;

        message.delete({ timeout: 0 })

        const Embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`💎・Авторы бота`)
            .setDescription('Красавчики, уважаю их :3')
            .addField("Владелец:", "mahoney#2228 , kill me, luffich#6666")
            .addField("Разработчик [Лучший в своём роде]:", "mahoney#2228")
            .addField("Тех.Помощник:", "Roman Liquid")
            .setTimestamp()
            .setFooter(`Informal helper | Michell Mahoney`, client.user.displayAvatarURL());
        return message.channel.send(`<@${message.author.id}>`, Embed).then(m => m.delete({ timeout: 30000 }));
    }
}
