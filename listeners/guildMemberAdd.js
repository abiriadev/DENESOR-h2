const { spoiler } = require('../modules/utils/chatDecorater')
module.exports = member => {
    member.guild.channels.cache
        .find(ch => ch.id === '751056203299291196')
        .send(`${spoiler(member.client.host)}`)
}
