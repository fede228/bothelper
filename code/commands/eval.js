const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');

const cooldown = new Set();

exports.commands = async (message, prefix) => {
    if (message.content === `${prefix}eval`) {
        try{
            
            //проверка на права
            
            args = message.content.slice(`${prefix}eval`).split(/ +/);
            let content = args.join(" ");
            
            const nocontent = new Discord.MessageEmbed() 
              .setDescription(`**${message.author.username}**, Эй... Дай код!`)
            if(!content) return message.reply(nocontent)
            
            content = content.replace(/(`|`​``)(js)?/gi, "", '');
            
            let time = Date.now();
            let result = await eval(content);
            let restime = Date.now();
            let type = typeof result;
            
            if (typeof result !== "string") {
              result = require("util").inspect(result, { depth: 0 });
            }
            
            message.reply(`**Time:** \`${restime - time}ms\`\n**Type:** \`${type}\``)
            message.reply(result, {code: 'js'})
            
            } catch(error) {
              message.reply(error.message, {code: 'js'} ).catch(() => { return; })
            }
    }
}