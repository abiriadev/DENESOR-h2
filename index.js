const discord = require('discord.js')
const chalk = require('chalk')

const { rando } = require('@nastyox/rando.js')

const serverLinkRegexs = [
    /discord\.gg\/([\w\d]*)/,
    /discord\.com\/invite\/([\w\d]*)/,
]

const my_servers = ['687271752224735233']

const like = msg => {
    let positive_emoji = ['👌', '❤', '✅', '👍', '😉']
    msg.react(rando(positive_emoji).value)
}

const spoiler = text => `||${text.toString()}||`
const quote = text => `\`${text.toString()}\``
const strong = text => `**${text.toString()}**`
const underline = text => `__${text.toString()}__`

const codeblock = (text, lang = '') => `\`\`\`${lang}\n${text}\n\`\`\``

const cache = {}

const messageToLink = msg =>
    `https://discordapp.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id}`

const give_attention = msg => {
    msg.delete()

    const nickAndName = member =>
        member.nickname === null
            ? `${member.user}`
            : `${member}(${member.user.tag})`

    const warning_message_renderer = msg =>
        new discord.MessageEmbed({
            title: '무단 홍보 발생',
            description: `${nickAndName(
                msg.member,
            )}님의 채팅이 홍보로 간주되어 즉시 삭제 조치되었습니다.\n\n이 조치가 부당하다고 판단되실 경우, ${quote(
                msg.guild.name,
            )}서버의 관리자 ${
                msg.guild.owner
            }님께 문의하실 수 있습니다.\n합의 이전에 같은 홍보성 목적의 게시물을 계속 올리시는 경우 ${quote(
                msg.guild.name,
            )}}서버에서 ${quote('추방')} 조치됩니다.\n\n${spoiler(
                msg.client.host,
            )}
            `,
            color: 'RED',
        })

    msg.channel.send(warning_message_renderer(msg))

    if (!cache[msg.author.id]) cache[msg.author.id] = 1
    else {
        const record_count = cache[msg.author.id]
        if (typeof record_count === 'number') {
            cache[msg.author.id] = record_count + 1

            if (record_count > 1)
                if (msg.member.kickable) msg.member.kick('무단 홍보')
        }
    }

    msg.client.host.send(
        `지금 ${quote(msg.channel.name)} 채널에서 ${quote(
            msg.author.tag,
        )} 에 의한 무단홍보가 발생하였습니다!!\n${messageToLink(msg)}`,
    )

    // 무단 홍보로 인해 글이 삭제 조치됩니다.
    // 이의가 있으실 경우 ${msg.guild.owner} 님께 문의하세요.
    // 그 전까지 또다른 홍보성 행위가 적발될 경우,
    // 추방 조치를 당하실 수 있습니다.${spoiler(msg.client.host)}
    // ()
}

const check = async msg => {
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
            if (err instanceof discord.DiscordAPIError)
                console.log('무효한 링크입니다')
            else console.error(err)
        }
    }

    return null
}

const client = new discord.Client()

client
    .on('debug', info => console.info(chalk.cyan(info)))
    .on('ready', async () => {
        console.log(`${client.user.tag} is ready!`)

        try {
            client.host = (await client.fetchApplication()).owner

            client.host.send(`START IN ${new Date()}`)
        } catch (err) {
            console.error(err)
        }
    })
    .on('message', async msg => {
        if ((await check(msg)) === Symbol.for('stop')) return

        if (msg.author.bot) return
        const prefix = '!'
        if (!msg.content.startsWith(prefix)) return
        msg.content = msg.content.slice(prefix.length)

        let answer = null
        if (msg.content === 'hello') {
            answer = 'yes'
            msg.reply(answer)
        } else if (msg.content === 'nick') console.log(msg.member.nickname)
        console.log(`${msg.author.tag}: ${msg.content}`)
    })
    .login(process.env.TOKEN)
