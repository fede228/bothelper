const { MessageEmbed } = require("discord.js");

exports.system = async(client, message) => {
    if (message.author.bot) return;
    if (message.channel.id == "828902963476299787") return //* Канал разработчика.

    const logs_channel = client.guilds.cache.get("693347344397107241").channels.cache.get("828902916470865940");

    //* Подключение настроек.
    const settings = require('../configs/settings').settings;
    if (!settings) return;

    const time = date_time();

    const Embed = new MessageEmbed()
    .setTitle(`📨・Логирование сообщений`)
    .addFields(
        { name: `Автор сообщения`, value: `**<@${message.author.id}> \`[${message.author.id}]\`.**` },
        { name: `Текстовый канал`, value: `<#${message.channel.id}>.`},
        { name: `Сообщение`, value: `${message.content}` },
        { name: `Время`, value: `\`${time}\`.`}
    )
    .setColor(settings.color)
    .setFooter(`Liquid Helper | Roman Liquid`, client.user.displayAvatarURL());

    logs_channel.send(Embed)
}

function date_time() {
    let date = new Date(+new Date().valueOf() + 10800000);
    return (
      `${date.getDate().toString().padStart(2, "0")}.` +
      `${(date.getMonth() + 1).toString().padStart(2, "0")}.` +
      `${date.getFullYear()} ` +
      `${date.getHours().toString().padStart(2, "0")}:` +
      `${date.getMinutes().toString().padStart(2, "0")}`
    );
  }