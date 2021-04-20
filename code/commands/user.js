const { MessageEmbed } = require("discord.js");
const moment = require("moment");


exports.commands = async (client, message, prefix) => {
    if (message.content.startsWith(`${prefix}user`)) {

        //* Подключение настроек.
        const settings = require('../configs/settings').settings;
        if (!settings) return;

        //* Удаление сообщения.
        message.delete({ timeout: 0 });

        const status = { //Создадим переменную со статусами чтобы они были не английском.
            "online": "Онлайн.",
            "idle": "Не на месте.",
            "dnd": "Не беспокоить.",
            "offline": "Оффлайн."
        }
        let mbr = message.mentions.members.first() || message.member; //Если есть упомянание, то mbr = тот кого упомянули, если нету то автору сообщения.
        if (mbr) { //Если всё ок.
            const Embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`💎・Информация о пользователе`)
                .addField('Дискорд', mbr.user.tag)
                .addField("ID", mbr.user.id) //Первое поле - айди автора.
                .addField("Никнейм", mbr.nickname !== null ? mbr.nickname : mbr.user.tag) //Второе поле - никнейм (НЕ ПУТАТЬ С НИКОМ И ТЕГОМ)!
                .addField("Статус", status[mbr.user.presence.status]) //Статус человека
                .addField("Играет в ", mbr.user.presence.game ? mbr.user.presence.game.name : "Ничего") //Во что играет
                .addField("Присоединился", mbr.joinedAt.toLocaleString()) //Когда зашёл на сервер
                .addField("Аккаунт создан", mbr.user.createdAt.toLocaleString()) //Когда создан аккаунт
                .addField("Роли на сервере", mbr.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles") //Роли человека на сервере
                .setThumbnail(mbr.user.displayAvatarURL) //Аватар человека
                .setFooter("Информация о пользователе.") //Футер
                .setTimestamp()
                .setFooter(`Informal helper | Michell Mahoney`, client.user.displayAvatarURL());
            return message.channel.send(`<@${message.author.id}>`, Embed).then(m => m.delete({ timeout: 30000 }));
        }
    }
}