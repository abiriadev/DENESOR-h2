const messageToLink = require('../modules/utils/messageToLink')
const discord = require('discord.js')

test('link test 1', () => {
    const guildID = 1234
    const channelID = 5678
    const messageID = 9101112

    const client = new discord.Client()
    const guild = new discord.Guild(client, {
        id: guildID,
    })
    const channel = new discord.GuildChannel(guild, {
        id: channelID,
    })
    const message = new discord.Message(
        client,
        {
            id: messageID,
        },
        channel,
    )

    expect(messageToLink(message)).toBe(
        `https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`,
    )
})
