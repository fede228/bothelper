const { MessageEmbed } = require("discord.js");

const cooldown = new Set();

exports.commands = async (message, prefix) => {
    if (message.content.startsWith(`${prefix}helps`)) {

    //* Подключение настроек.
    const settings = require('../configs/settings').settings;
    if (!settings) return;

    //* Подключение списка команд.
    const commands = require('../configs/help').help.commands;

    //* Удаление сообщения.
    message.delete({ timeout: 0 });

    //* Задержка.
    if (cooldown.has(message.author.id)) {
        require('../error').sendError({ message: message, react: true,
        content: 'Не так быстро! Задержка 2 минуты.' });
        return;
    }

    //* Проверка, если нету команд, то ошибка.
    if (!commands) {
        require('../error').sendError({ message: message, react: true,
        content: 'Не нашёл список команд. Сообщите разработчику!' });
        return;
    }

    //* Создание эмдеда.
    const Embed = new MessageEmbed()
    .setTitle(`📑・Список команд`)
    .setDescription(commands)
    .setColor(settings.color)
    .setTimestamp()
    .setFooter(`Informal helper | Michell Mahoney`, message.client.user.displayAvatarURL());

    //* Добавляем id в КД.
    cooldown.add(message.author.id);

    //* Удаляем id из КД.
    setTimeout(() => { cooldown.delete(message.author.id) }, 60000);

    //* Отправка сообщения.
    message.channel.send(`<@${message.author.id}>`, Embed).then(m => m.delete({ timeout: 30000 }))
    }
}