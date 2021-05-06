const discord = require('discord.js')
const chatDecorater = require('./utils/chatDecorater')
const messageToLink = require('./utils/messageToLink')

const cache = {}

const nickAndName = member =>
    member.nickname === null
        ? `${member.user}`
        : `${member}(${member.user.tag})`

const warning_message_renderer = msg =>
    new discord.MessageEmbed({
        title: '무단 홍보 발생',
        description: `${nickAndName(
            msg.member,
        )}님의 채팅이 ${chatDecorater.strong(
            chatDecorater.underline('홍보'),
        )}로 간주되어 즉시 삭제 조치되었습니다.\n\n이 조치가 부당하다고 판단되실 경우, ${chatDecorater.quote(
            msg.guild.name,
        )}서버의 관리자 ${
            msg.guild.owner
        }님께 문의하실 수 있습니다.\n합의 이전에 같은 홍보성 목적의 게시물을 계속 올리시는 경우 ${chatDecorater.quote(
            msg.guild.name,
        )}서버에서 ${chatDecorater.quote('추방')} 조치됩니다.`,
        color: 'RED',
    })

const reportToHost = msg => {
    msg.client.host.send(
        `지금 ${chatDecorater.quote(
            msg.channel.name,
        )} 채널에서 ${chatDecorater.quote(
            msg.author.tag,
        )} 에 의한 무단홍보가 발생하였습니다!!\n${messageToLink(msg)}`,
    )
}

module.exports = msg => {
    msg.delete()

    msg.channel.send(
        `${chatDecorater.spoiler(msg.client.host)}`,
        warning_message_renderer(msg),
    )

    if (!cache[msg.author.id]) cache[msg.author.id] = 1
    else {
        const record_count = cache[msg.author.id]
        if (typeof record_count === 'number') {
            cache[msg.author.id] = record_count + 1

            if (record_count > 1)
                if (msg.member.kickable) msg.member.kick('무단 홍보')
        }
    }

    reportToHost(msg)
}
