const { EmbedBuilder } = require("@discordjs/builders");
const { GuildMember, Embed, InteractionCollector } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    //Is the member that just joined a bot? We don't want to welcome them.
    if (!member.user.bot) {
      const { user, guild } = member;
      const welcomeChannel = member.guild.channels.cache.get(
        config.welcomeChannel
      );

      const spamLogs = member.guild.channels.cache.get(config.spamLogs);

      const welcomeEmbed = new EmbedBuilder()
        .setTitle("**New member!**")
        .setDescription(
          `Hello <@${
            member.id
          }>, welcome to The Actual Budget Discord server! You should be given access to the server after you verify that you have read the rules.

            ${member.guild.channels.cache
              .get(config.rulesChannel)
              .toString()} if you have issues after verifying and refreshing your browser / restarting the app.
            
            Say hi in ${member.guild.channels.cache
              .get(config.welcomeChannel)
              .toString()} or dive right in. Look forward to talking to you.`
        )
        .setColor(0x037821)
        .addFields({ name: "Total members", value: `${guild.memberCount}` })
        .setTimestamp();

      welcomeChannel.send({ embeds: [welcomeEmbed] });

      spamLogs.send(`<@${member.id}> joined`)

      member.roles.add(config.newMemberRole);
    }
  },
};
