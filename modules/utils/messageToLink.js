const threeDataToLink = require('./threeDataToLink')

module.exports = msg =>
    threeDataToLink({
        guildID: msg.guild.id,
        channelID: msg.channel.id,
        messageID: msg.id,
    })
