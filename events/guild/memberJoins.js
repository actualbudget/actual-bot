const {EmbedBuilder} = require("@discordjs/builders");
const {GuildMember, Embed, InteractionCollector} = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {       

            const {user, guild} = member;
            const welcomeChannel = member.guild.channels.cache.get('995685262061482106');

            const welcomeEmbed = new EmbedBuilder()
            .setTitle("**New member!**")
            .setDescription(`Hello <@${member.id}>, welcome to The Actual Budget Discord server! You should be given access to the server after you verify that you have read the rules.

            ${member.guild.channels.cache.get('997025529494515733').toString()} if you have issues after verifying and refreshing your browser / restarting the app.
            
            Say hi in ${member.guild.channels.cache.get('997025529494515733').toString()} or dive right in. Look forward to talking to you.`)
            .setColor(0x037821)
            .addFields({name: 'Total members', value: `${guild.memberCount}`})
            .setTimestamp();

            welcomeChannel.send({embeds: [welcomeEmbed]});
            //member.roles.add(data.Role);
        }
    }