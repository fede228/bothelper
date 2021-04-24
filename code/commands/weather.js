const { MessageEmbed } = require("discord.js");
const weather = require('weather-js');

exports.commands = async (client, message, prefix) => {
const args = message.content.slice('${prefix}clear').split(/ +/)
const settings = require('../configs/settings').settings;
if (!settings) return;

if (message.content.startsWith(`${prefix}weather`)) {

weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {

if (err) message.channel.send(err);
if (result === undefined || result.length === 0) {
    message.channel.send('Пожалуйста, введите местоположение! Например: /weather <ваш город>')
    return;
}

let current = result[0].current;
let location = result[0].location;

const embed = new MessageEmbed()
    .setDescription(`**${current.skytext}**`)
    .setAuthor(`Погода в ${current.observationpoint}`)
    .setThumbnail(current.imageUrl)
    .setColor('#DEB887')
    .addField('Тип температуры', `\`${location.degreetype}\``, true)
    .addField('Температура',`\`${current.temperature} °C\``, true)
    .addField('Ощущается как', `\`${current.feelslike} °C\``, true)
    .addField('Ветер', `\`${current.winddisplay}\``, true)
    .addField('Влажность', `\`${current.humidity}%\``, true)
    .addField('Дата', `День недели: \`${current.day}\`\nДата: \`${current.date}\`\nЧасовой пояс: \`UTC${location.timezone}\``, true)
    .addField('Время', `Данные были актуальны в \`${current.observationtime}\``, true)
    .setFooter(`Informal helper | Michell Mahoney`, message.client.user.displayAvatarURL())
    .setTimestamp()
    message.channel.send({embed}).then(msg => {msg.delete(50000)});
})
}
}