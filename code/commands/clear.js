const Discord = require("discord.js");
const fs = require("fs");

exports.commands = async (client, message, prefix) => {
  if (message.content.startsWith(`${prefix}clear`)) {
  
    // Аргументы (глобально).
    const args = message.content.slice('${prefix}clear').split(/ +/) // Убераем пробелы, а так же скрываем саму команду.

    //* Подключение настроек.
    const settings = require('../configs/settings').settings;
    if (!settings) return;

    message.delete({ timeout: 5000 });

   try {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("У вас нет прав");
    if (args[1] > 100) return message.channel.send("Укажите значение меньше 100");
    if (args[1] < 1) return message.channel.send("Укажите значение больше 1");

    let text = message.content.slice(6);

    message.channel.bulkDelete(args[1]).then(() =>{
      message.reply(`Очищено ${args[1]} сообщений!`).then(m => m.delete({ timeout: 20000 }))
      })
        
    } catch (err) {
      console.log(err.name)
    }
  }
}