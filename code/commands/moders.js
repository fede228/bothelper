const { MessageEmbed } = require("discord.js");

const cooldown = new Set();

exports.commands = async (message, prefix) => {
    if (message.content.startsWith(`${prefix}moders`)) {

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
        let roleid = "";
        let moders = "Главный модератор: <@463735965408559134>\nЗам.Главного модератора: <@665232668635693107>\nCтаршие модераторы: <@627112806763724813>\nМодераторы: <@527043668213760010>, <@404495307850645506>";
        message.guild.members.cache.filter((m) => m.roles.cache.has(roleid)).array().forEach((m) => (moders += m.toString() + "\n"));

        //* Делаем эмбед.
        const Embed = new MessageEmbed()
        .setTitle(`💎・Модераторы чата`)
        .setDescription(moders)
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