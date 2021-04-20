const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");


exports.commands = async (client, message, prefix) => {
    if (message.content.startsWith(`${prefix}news`)) {

        //* Подключение настроек.
        const settings = require('../configs/settings').settings;
        if (!settings) return;

        message.delete();

        const Embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`💎・Ссылка`)
            .setColor("RANDOM")
            .addField('Приглос для крутых:', 'https://discord.gg/dAnz9uHgz7')
            .setTimestamp()
            .setFooter(`Informal helper | Michell Mahoney`, client.user.displayAvatarURL())
            .setImage(`https://i.imgur.com/7Wa7nP0.gif`);
            message.channel.send(`<@&784364508432695296>`, Embed)
    }
}