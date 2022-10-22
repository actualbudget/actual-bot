const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("role-react")
    .setDescription("Create a role react message.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addMentionableOption(option => {
      option.setName("role")
        .setDescription("Role to be given.")
        .setRequired(true);
    })
    .addStringOption(option => {
      option.setName("message")
        .setDescription("Message to be reacted to.")
        .setRequired(true);
    })
    .addStringOption(option => {
      option.setName("emoji")
        .setDescription("Emoji to be used.")
        .setRequired(true);
    })
    .addMentionableOption(option => {
      option.setName("channel")
        .setDescription("Channel to send the message in.")
        .setRequired(true);
    }),
  async execute(interaction, client) {
    const { channel, options } = interaction;

    const role = options.getMentionable("role");
    const embedChannel = options.getMentionable("channel");
    const message = options.getString("message");
    const emoji = options.getString("emoji");

    const embed = new EmbedBuilder()
      .setDescription(message)
      .setColor(0x00ff00);

    const msg = await embedChannel.send({ embeds: [embed] });
    await msg.react(emoji);

    // store the data in a database
    const data = {
      message: msg.id,
      role: role.id,
      emoji: emoji
    };

    client.db.push(`role-reactions_${interaction.guild.id}`, data);

    const embed2 = new EmbedBuilder()
      .setDescription(`Successfully created role react message and stored data in the database.`)
      .setColor(0x00ff00);

    client.db.get(`role-reactions_${interaction.guild.id}`).then(await interaction.reply({ embeds: [embed2] }));
  }
};
