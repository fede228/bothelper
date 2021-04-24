const { MessageEmbed } = require("discord.js");
const event = new Date(Date.UTC(2012, 11, 12, 3, 0, 0));
const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
const Discord = require("discord.js");
const client = new Discord.Client();

exports.commands = async (client, message, prefix) => {
    if (message.content.startsWith(`${prefix}serverinfo`)) {
        
        //* Подключение настроек.
        const settings = require('../configs/settings').settings;
        if (!settings) return;

        message.delete({ timeout: 0 })
        
        const Embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`💎・Информация о сервере`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addField(':police_officer: Владелец сервера:', `${message.guild.owner}`, true)
            .addField(':hammer_pick: Название сервера:', `**${message.guild.name}**`, true)
            .addField(':id: ИД сервера:', `**${message.guild.id}**`, true)
            .addField(':writing_hand: Сервер создан:', `**${message.guild.createdAt.toLocaleDateString(undefined, options)}**`, true)
            .addField(':family_wwg: Участников на сервере:', `**${message.guild.memberCount}**`, true)
            .addField(':triangular_flag_on_post: Регион сервера:', `**${message.guild.region}**`, true)
            .addField(':gear: Каналы:', `**${message.guild.channels.cache.size}**`, true)
            .addField(':shield: Роли:', `**${message.guild.roles.cache.size}**`, true)
            .addField(':grinning: Эмодзи:', `**${message.guild.emojis.cache.size}**`, true)
            .addField(':warning: Канал системных сообщений:', `${message.guild.systemChannel}`, true)
            .addField(':watch: Тайм-аут AFK:', `**${message.guild.afkTimeout / 60} минут**`, true)
            .addField(':sleeping: АФК Канал:',`**${message.guild.afkChannel.name}**`, true)
            .setTimestamp()
            .setFooter(`Informal helper | Michell Mahoney`, client.user.displayAvatarURL());
        return message.channel.send(`<@${message.author.id}>`, Embed).then(m => m.delete({ timeout: 30000 }));
    }
}
