const Discord = require("discord.js");

exports.system = async (client, oldMember, newMember) => {
  
    const chat = client.guilds.cache.get("693347344397107241").channels.cache.get("829596116202291221");
  
    const settings = require('../configs/settings').settings;

    const Embed = new Discord.MessageEmbed()
      .setTitle(`⚠️・Система безопасности`)
      .setColor(settings.color)
      .setTimestamp()
      .setFooter(`Liquids Helper | Roman Liquid`, client.user.displayAvatarURL());
  
    if (oldMember.roles.cache.size == newMember.roles.cache.size) return;
    if (newMember.user.bot) return;
    if (newMember.guild.id != "693347344397107241") return;
  
    try {
      if (oldMember.roles.cache.size < newMember.roles.cache.size) {
        let oldRolesID = [];
        let newRoleID;

        oldMember.roles.cache.forEach((role) => { oldRolesID.push(role.id) });
        newMember.roles.cache.forEach((role) => { if (!oldRolesID.some((elemet) => elemet == role.id)) newRoleID = role.id });

        const entry = await newMember.guild.fetchAuditLogs({ type: "MEMBER_ROLE_UPDATE" }).then((audit) => audit.entries.first());
        let member = newMember.guild.members.cache.get(entry.executor.id);

        if (member.user.id == oldMember.user.id) member = oldMember;
        if (member.roles.cache.some((r) => ['704322375277084672'].includes(r.id))) return;
        newMember.roles.cache.filter((i) => !oldMember.roles.cache.has(i.id)).forEach(async (trole) => {
            //* Список запрещённый для выдачи роли.

            if (['828890078625136660', '828898691565879346', '713687708442296400', '775726851313369118', '786962813243228190', '708630202296565781', '828893605635555339', '704333236347600907'].includes(trole.id)) {

              const toRemove = member.roles.cache.filter((r) => r.name != "VIP персона (буст)");
  
              const toRemoveString = [];
              toRemove.forEach((e) => { if (e.id != chat.guild) { toRemoveString.push(e.toString()) } });

              Embed.setDescription(`**<@${member.id}> выдал запрещённую роль - <@&${trole.id}>.\nС него сняты все роли!\nСнятые роли: ${toRemoveString.join(" ")}**`)
              chat.send(`<@${member.id}> | <@&828893605635555339>`, Embed);
  
              await member.roles.remove(toRemove);
              await newMember.roles.remove(trole.id);
              await member.roles.add(`828888227506683944`);
            }
          });
      }
    } catch (e) {}
  };  
