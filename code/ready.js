const Discord = require("discord.js");
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"] });

const status = process.env.STATUS;

exports.start = () => {
    console.log(`✅ | Успешный запуск бота`)
    connect();
    console.log(`✅ | Нагрузка на бота: ${process.memoryUsage().heapUsed / 1024 / 1024} байт`)
}

async function connect() {
    if (!status) {
        console.log(`✅ | Бот запущен на компьютере`)
        return;
    }

    if (status === "0") {
        console.log(`✅ | Бот запущен на хостинге`)
        return;
    }
}