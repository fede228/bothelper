const { MessageEmbed } = require("discord.js");

exports.commands = async (bot, message, args, prefix) => {
    if (message.content.startsWith(`${prefix}delrole`)) {

        //* Подключение настроек.
        const settings = require('../configs/settings').settings;

        if (!settings) return;
        let rolename = args.slice(8).join(" ");
        if (!args[0]) return message.channel.send(`Укажите название роли!`)
            .then(msg => {
                msg.delete({ timeout: 3000 });
            });
        if (!args.length > 1) return message.channel.send(`Используйте /delrole <Название роли>!`)
            .then(msg => {
                msg.delete({ timeout: 3000 });
            });
        const role = message.guild.roles.cache.find(role => role.name === rolename);
        role.delete(`Захотелось`);
        message.channel.send(`Удалена роль!`)
            .then(msg => {
                msg.delete({ timeout: 3000 });
            });
    };
}