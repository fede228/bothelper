const { MessageEmbed } = require("discord.js");

const cooldown = new Set();

exports.commands = async (message, prefix) => {
    if (message.content.startsWith(`${prefix}members`)) {

        //* Подключение настроек.
        const settings = require('../configs/settings').settings;
        if (!settings) return;

        //* Удаление сообщения.
        message.delete({ timeout: 0 });

        //* Задержка.
        if (cooldown.has(message.author.id)) {
            require('../error').sendError({ message: message, react: true,
            content: 'Не так быстро! Задержка 2 минуты.' });
            return;
        }

        //* Определение данных, список модераторов.
        let roleid = "655528442825015297"; //* Роль модераторов
        let moders = "";
        message.guild.members.cache.filter((m) => m.roles.cache.has(roleid)).array().forEach((m) => (moders += m.toString() + "\n"));
  
        let techid = "787996633156550676"; //* Роль Технических админов
        let techs = "";
        message.guild.members.cache.filter((m) => m.roles.cache.has(techid)).array().forEach((m) => (techs += m.toString() + "\n"));

        //* Делаем эмбед.
        const Embed = new MessageEmbed()
        .setTitle(`💎・Информация о пользователях`)
        .addField("Технические администраторы", techs)
        .addField("Модераторы", moders)
        .setColor(settings.color)
        .setTimestamp()
        .setFooter(`Informal helper | Michell Mahoney`, message.client.user.displayAvatarURL());

        //* Добавляем id в КД.
        cooldown.add(message.author.id);

        //* Удаляем id из КД.
        setTimeout(() => { cooldown.delete(message.author.id) }, 1000);

        //* Отправка сообщения.
        message.channel.send(`<@${message.author.id}>`, Embed).then(m => m.delete({ timeout: 30000 }));
    }
}