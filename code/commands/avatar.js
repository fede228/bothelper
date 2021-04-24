const { MessageEmbed } = require("discord.js");

exports.commands = async (client, message, prefix) => {
    if (message.content.startsWith(`${prefix}avatar`)) {

        // Подключение настроек.
        const settings = require('../configs/settings').settings;
        if (!settings) return;

        const user = message.mentions.users.first() || message.author;
        const embed = new MessageEmbed()
            .setColor(settings.color)
            .setAuthor(user.username)
            .setImage(user.displayAvatarURL())
            .setFooter(`Informal helper | Michell Mahoney`, message.client.user.displayAvatarURL());
        message.channel.send(embed)
    }
}