const { MessageEmbed } = require("discord.js");
const ms = require("ms");

exports.commands = async (client, message, prefix) => {
// Подключение настроек.
const settings = require('../configs/settings').settings;
if (!settings) return;

const args = message.content.slice('/mute').split(' ');

if (message.content.startsWith(`${prefix}mute`)) {
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
    .addField("Используйте:", `\`/mute <user> <duration> <reason>\``)
    .setColor('#FFDEAD')
    .addField("Аргументы:", `\`user\`: Упоминание пользователя.\n\`duration\`: Длительность 1s/m/h/d\n\`reason\`: Причина (текст)`)
    .setFooter('Informal helper | Michell Mahoney')
    .setTimestamp();
message.channel.send({embed}).then(msg => {msg.delete({ timeout: 15000 })});
return;
}

if(!member) {
message.react('📛')
const embed = new MessageEmbed()
    .addField("Используйте:", `\`/mute <user> <duration> <reason>\``)
    .setColor('#FFDEAD')
    .addField("Аргументы:", `\`user\`: Упоминание пользователя.\n\`duration\`: Длительность 1s/m/h/d\n\`reason\`: Причина (текст)`)
    .setFooter('Informal helper | Michell Mahoney')
    .setTimestamp();
message.channel.send({embed}).then(msg => {msg.delete({ timeout: 15000 })});
return;
} else if (!reason) {
message.react('📛')
const embed = new MessageEmbed()
    .addField("Используйте:", `\`/mute <user> <duration> <reason>\``)
    .setColor('#FFDEAD')
    .addField("Аргументы:", `\`user\`: Упоминание пользователя.\n\`duration\`: Длительность 1s/m/h/d\n\`reason\`: Причина (текст)`)
    .setFooter('Informal helper | Michell Mahoney')
    .setTimestamp();
message.channel.send({embed}).then(msg => {msg.delete({ timeout: 15000 })});
return;
} else if (!mutetime) {
message.react('📛')
const embed = new MessageEmbed()
    .addField("Используйте:", `\`/mute <user> <duration> <reason>\``)
    .setColor('#FFDEAD')
    .addField("Аргументы:", `\`user\`: Упоминание пользователя.\n\`duration\`: Длительность 1s/m/h/d\n\`reason\`: Причина (текст)`)
    .setFooter('Informal helper | Michell Mahoney')
    .setTimestamp();
message.channel.send({embed}).then(msg => {msg.delete({ timeout: 15000 })});
return;
}

if (member.hasPermission('MANAGE_MESSAGES')) {
message.react('📛')
const embed = new MessageEmbed()
    .setTitle(`**Ошибка!**`)
    .setDescription(`Нет прав замутить данного пользователя.`)
    .setFooter('Informal helper | Michell Mahoney')
    .setColor('#FFDEAD')
    .setTimestamp();
message.channel.send({embed}).then(msg => {msg.delete({ timeout: 15000 })});
return
}

const muterole = message.guild.roles.cache.find(role => role.name === "Muted");

await(member.roles.add(muterole.id));

let embed = new MessageEmbed()
    .setAuthor(`${user.username} был замучен на ${mutetime}`, `${user.displayAvatarURL()}`)
    .addField("Модератором", `<@${message.author.id}> | ID нарушителя ${member.id}`, true)
    .addField("Причина:", reason)
    .setFooter('Informal helper | Michell Mahoney')
    .setColor('#ADFF2F')
    .setTimestamp();
message.channel.send(embed);

setTimeout(function(){
member.roles.remove(muterole.id);
}, ms(mutetime));
}
}

