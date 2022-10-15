const config = require("../../config.json");

module.exports = {
  name: "messageReactionRemove",
  async execute(reaction, user) {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    // Contributor role
    if (reaction.message.id == config.contributorRole) {
      if (reaction.emoji.name === "✅") {
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.remove(config.contributorRole);
      }
    }

    // Documenter role
    if (reaction.message.id == config.documenterRole) {
      if (reaction.emoji.name === "✅") {
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.remove(config.documenterRole);
      }
    }

    // Developer role
    if (reaction.message.id == config.developerRole) {
      if (reaction.emoji.name === "✅") {
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.remove(config.developerRole);
      }
    }
  }
}