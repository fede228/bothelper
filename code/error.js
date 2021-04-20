const { MessageEmbed } = require("discord.js");

exports.random = array => array[Math.floor(Math.random() * array.length)];

exports.sendError = ({ message, react = true, content }) => {

    let emoji = exports.random(['😥', '😪', '❌', '⚠', '🚫']);
    if (react) message.react(emoji);
    const member = `<@${message.author.id}>`;

    //* Embed
    const ErrorMessage = new MessageEmbed()
    .setTitle(`**${emoji}・Ошибка бота**`)
    .setColor(`#ff0000`)
    .setTimestamp()
    .setDescription(`**${content}**`)
    .setFooter(`Liquid Helper | Ошибка бота`, message.client.user.displayAvatarURL());

    //* Отправка ошибки.
    message.channel.send(member, ErrorMessage).then(m => m.delete({ timeout: 30000 }));
}