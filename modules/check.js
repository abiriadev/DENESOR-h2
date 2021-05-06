const my_servers = require('../myServers.json')
const serverLinkRegexs = require('../serverLinkRegexs')
const discord = require('discord.js')
const like = require('./utils/like')
const give_attention = require('./giveAttention')

function invitFetchError(err) {
    if (err instanceof discord.DiscordAPIError) console.log('무효한 링크입니다')
    else console.error(err)
}

module.exports = async msg => {
    if (serverLinkRegexs.some(regex => regex.test(msg.content))) {
        console.log('서버 홍보를 감지했습니다!')

        const [, inviteCode] = msg.content.match(
            serverLinkRegexs.find(regex => regex.test(msg.content)),
        )

        console.log(`inviteCode: ${inviteCode}`)

        try {
            const invite = await msg.client.fetchInvite(inviteCode)

            if (
                my_servers.some(
                    my_server_id => invite.guild.id === my_server_id,
                )
            ) {
                console.log('내 서버 홍보구만!')
                like(msg)
            } else {
                console.log('무지몽매한 녀ㅓ석#@!@@!')
                give_attention(msg)
                return Symbol.for('stop')
            }
        } catch (err) {
            invitFetchError(err)
        }
    }

    return null
}
