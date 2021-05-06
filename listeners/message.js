const check = require('../modules/check')
const bookmark = require('../modules/bookmark')

module.exports = async msg => {
    if (msg.author.bot) return
    if ((await check(msg)) === Symbol.for('stop')) return

    const prefix = '!'
    if (!msg.content.startsWith(prefix)) return
    msg.content = msg.content.slice(prefix.length)
    msg.args = msg.content.split(/\s+/)
    msg.command = msg.args?.[0]

    let answer = null
    if (msg.content === 'hello') {
        answer = 'yes'
        msg.reply(answer)
    } else if (msg.content === 'nick') console.log(msg.member.nickname)
    else if (msg.command === 'bookmark') bookmark(msg)
    console.log(`${msg.author.tag}: ${msg.content}`)
}
