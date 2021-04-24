const { MessageEmbed } = require("discord.js");

exports.commands = async (client, message, prefix) => {
    if (message.content.startsWith(`${prefix}invite`)) {

        //* Подключение настроек.
        const settings = require('../configs/settings').settings;
        if (!settings) return;

        message.delete({ timeout: 0 })

        const Embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`💎・ Ссылки`)
            .setDescription('Спасибо за приглашение на ваш сервер! Советуем поставить роль бота выше всех ролей.')
            .addField('Пригласить бота', '[Пригласить бота]()', true)
            .addField('Сервер поддержки бота', '[Сервер поддержки бота]()', true)
            .setTimestamp()
            .setFooter(`Informal helper | Michell Mahoney`, client.user.displayAvatarURL());
        return message.channel.send(`<@${message.author.id}>`, Embed).then(m => m.delete({ timeout: 30000 }));
    }
}
