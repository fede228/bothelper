const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");

exports.commands = async (client, message, prefix) => {
    if (message.content.startsWith(`${prefix}infobot`)) {
       
        //* Подключение настроек.
        const settings = require('../configs/settings').settings;
        if (!settings) return;
        
        const Embed = new MessageEmbed()
        .setTitle(`💎・Информация о боте`)
        .setDescription('**Тут вся основная информация о боте**')
        .setColor("RANDOM")
        .addField(':calendar_spiral: Дата создания бота:', '10.04.2021', true)
        .addField(':blond_haired_man: Разработчики бота:', '<@691701692256878632>', true)
        .addField(':watch: Последнее обновление:', '19.04.2021, 22:39', true)
        .setTimestamp()
        .setFooter(`Informal helper | Michell Mahoney`, message.client.user.displayAvatarURL());
        message.channel.send(`<@${message.author.id}>`, Embed).then(m => m.delete({ timeout: 10000 }));
    }
}