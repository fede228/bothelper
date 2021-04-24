const { MessageEmbed } = require("discord.js");
const ms = require("ms");

exports.commands = async (client, message, prefix) => {
// Подключение настроек.
const settings = require('../configs/settings').settings;
if (!settings) return;

const args = message.content.slice('+unmute').split(' ');

if (message.content.startsWith(`${prefix}unmute`)) {
message.delete();
if(!message.member.hasPermission("MANAGE_MESSAGES")) {
message.react('📛')
const embed = new MessageEmbed()
    .setTitle(`**Ошибка!**`)
    .setDescription(`Нет прав!`)
    .setFooter('Informal helper | Michell Mahoney')
    .setColor('#FFDEAD')
    .setTimestamp();
message.channel.send({embed}).then(msg => {msg.delete(15000)});
return
}

let member = message.mentions.members.first();
const user = message.mentions.users.first()
let mutetime = args[2];
let reason = args.join(" ").slice(31)

if(!args[0]){
message.react('📛')
const embed = new MessageEmbed()
    .addField("Используйте:", `\`+unmute <user> <duration> <reason>\``)
    .setColor('#FFDEAD')
    .addField("Аргументы:", `\`user\`: Упоминание пользователя.`)
    .setFooter('Informal helper | Michell Mahoney')
    .setTimestamp();
message.channel.send({embed}).then(msg => {msg.delete({ timeout: 15000 })});
return;
}

if(!member) {
message.react('📛')
const embed = new MessageEmbed()
    .addField("Используйте:", `\`+unmute <user> <duration>\``)
    .setColor('#FFDEAD')
    .addField("Аргументы:", `\`user\`: Упоминание пользователя.`)
    .setFooter('Informal helper | Michell Mahoney')
    .setTimestamp();
message.channel.send({embed}).then(msg => {msg.delete({ timeout: 15000 })});
return;
} else if (!reason) {
message.react('📛')
const embed = new MessageEmbed()
    .addField("Используйте:", `\`+unmute <user>\``)
    .setColor('#FFDEAD')
    .addField("Аргументы:", `\`user\`: Упоминание пользователя.`)
    .setFooter('Informal helper | Michell Mahoney')
    .setTimestamp();
message.channel.send({embed}).then(msg => {msg.delete({ timeout: 15000 })});
return;
} else if (!mutetime) {
message.react('📛')
const embed = new MessageEmbed()
    .addField("Используйте:", `\`+гтmute <user> <duration>\``)
    .setColor('#FFDEAD')
    .addField("Аргументы:", `\`user\`: Упоминание пользователя.`)
    .setFooter('Informal helper | Michell Mahoney')
    .setTimestamp();
message.channel.send({embed}).then(msg => {msg.delete({ timeout: 15000 })});
return;
}

if (member.hasPermission('MANAGE_MESSAGES')) {
message.react('📛')
const embed = new MessageEmbed()
    .setTitle(`**Ошибка!**`)
    .setDescription(`Нет прав азмутить данного пользователя.`)
    .setFooter('Informal helper | Michell Mahoney')
    .setColor('#FFDEAD')
    .setTimestamp();
message.channel.send({embed}).then(msg => {msg.delete({ timeout: 15000 })});
return
}

const muterole = message.guild.roles.cache.find(role => role.id === "797901366394880000");

member.roles.cache.remove(muterole.id);

let embed = new MessageEmbed()
    .setAuthor(`${user.username} был размучен`, `${user.displayAvatarURL()}`)
    .setColor('#ADFF2F')
    .addField("Модератором", `<@${message.author.id}> | ID размученного ${member.id}`, true)
    .setFooter('Informal helper | Michell Mahoney')
    .setTimestamp();
message.channel.send(embed);

member.roles.cache.remove(muterole.id);
}
}