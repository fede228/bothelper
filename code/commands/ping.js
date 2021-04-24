const { MessageEmbed } = require("discord.js");

const cooldown = new Set();

exports.commands = async (message, prefix) => {
    if (message.content === `${prefix}ping`) {

        //* Подключение настроек.
        const settings = require('../configs/settings').settings;
        if (!settings) return;

        //* Удаление сообщения.
        message.delete({ timeout: 5000 });

        //* Если есть ID, то return.
        if (cooldown.has(message.author.id)) {
            require('../error').sendError({ message: message, react: true,
            content: 'Не так быстро! Задержка 2 минуты.' });
            return;
        }

        //* Создание Embed'a.
        const Embed = new MessageEmbed()
        .setTitle(`🚀・Пинг бота`)
        .setDescription(`**Значение загружается...**`)
        .setColor(settings.color)
        .setTimestamp()
        .setFooter(`Informal helper | Michell Mahoney`, message.client.user.displayAvatarURL());

        //* Добавляем id в КД.
        cooldown.add(message.author.id);

        //* Удаляем id из КД.
        setTimeout(() => { cooldown.delete(message.author.id) }, 120000);

        //*Отправляем сообщение
        let msg = message.channel.send(Embed).then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp;

            Embed.setDescription(`**Пинг бота: ${ping}.**`);

            //* Изменение и удаление сообщения.
            m.edit(Embed);
            m.delete({ timeout: 60000 });
        })
    }
}
