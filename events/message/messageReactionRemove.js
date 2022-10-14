module.exports = {
  name: "messageReactionRemove",
  async execute(reaction, user) {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    // Contributer role
    if (reaction.message.id == "1027831065139761164") {
      if (reaction.emoji.name === "✅") {
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.remove("1027828366474235984");
      }
    }

    // Documentor role
    if (reaction.message.id == "1027831134173802537") {
      if (reaction.emoji.name === "✅") {
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.remove("1027828648121729024");
      }
    }

    // Developer role
    if (reaction.message.id == "1027831265711378452") {
      if (reaction.emoji.name === "✅") {
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.remove("1027828559970062336");
      }
    }
  }
}