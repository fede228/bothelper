const { MessageEmbed } = require("discord.js");
const cooldown = new Set();

exports.commands = async (client, message, prefix) => {
// Подключение настроек.
const settings = require('../configs/settings').settings;
if (!settings) return;

const args = message.content.slice('/kick').split(' ');

if (message.content.startsWith(`${prefix}kick`)) {

if (cooldown.has(message.author.id)) {
const embed3 = new MessageEmbed()
    .setTitle(`**Ошибка!**`)
    .setColor('#FFDEAD')
    .addField("Не так быстро!", `Попробуйте через ${cooldown} минут.`)
    .setFooter('Informal helper | Michell Mahoney')
    .setTimestamp();
message.channel.send({embed3}).then(msg => {msg.delete(15000)});
return
}
const user1 = message.mentions.users.first()
const user = message.mentions.members.first();
const reason = args.join(" ").slice(28)

if (!reason) {
  message.react('📛')
  const embed = new MessageEmbed()
      .addField("Используйте:", `\`/kick <user> <reason>\``)
      .setColor('#FFDEAD')
      .addField("Аргументы:", `\`user\`: Упоминание пользователя.\n\`reason\`: Причина (текст)`)
      .setFooter('Informal helper | Michell Mahoney')
      .setTimestamp();
  message.channel.send({embed}).then(msg => {msg.delete(50000)});
  return
}
    if (user) {
      const member = message.guild.member(user);
      if (member) {
            const embed1 = new MessageEmbed()
              .setAuthor(`${user1.username} был исключен`, `${user1.displayAvatarURL()}`)
              .addField("Модератором", `<@${message.author.id}> | ID нарушителя ${member.id}`)
              .addField("Причина:", reason)
              .setFooter('Informal helper | Michell Mahoney')
              .setColor('#FF0000')
              .setTimestamp();
            message.channel.send(embed1);
            member.kick(reason)
          .catch(err => {
            message.react('📛')
            const embed = new MessageEmbed()
              .setTitle(`**Ошибка!**`)
              .setDescription(`Нет прав выгнать данного пользователя.`)
              .addField(`**Cуть ошибки:**`, `\`\`\`${err}\`\`\``)
              .setFooter('Informal helper | Michell Mahoney')
              .setColor('#FFDEAD')
              .setTimestamp();
            message.channel.send({embed}).then(msg => {msg.delete(50000)});
          });
      } else {
        message.react('📛')
        message.reply("**Ошибка!**, данного пользователя нет на сервере.");
      }
    } else {
    message.react('📛')
    const embed4 = new MessageEmbed()
      .addField("Используйте:", `\`/kick <user> <reason>\`\n  \n  `)
      .addField("Аргументы:", `\`user\`: Упоминание пользователя.\n\`reason\`: Причина (текст)`)
      .setColor('#FFDEAD')
      .setFooter('Informal helper | Michell Mahoney')
      .setTimestamp();
    message.channel.send({embed4}).then(msg => {msg.delete(50000)});
    }
  }
}
