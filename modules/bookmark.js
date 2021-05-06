// const firebase = require('firebase')

const threeDataToLink = require('./utils/threeDataToLink')
const DB = require('../src/firebase')()
const chatDecorater = require('./utils/chatDecorater')

const getReference = async msg => {
    // const msgCache = msg

    const filter = m => {
        if (m.author.bot) return false
        else if (!m.reference) {
            m.reply('please reference the message and try again :(')

            return false
        } else return true
    }
    // Errors: ['time'] treats ending because of the time limit as an error
    try {
        const collected = await msg.channel.awaitMessages(filter, {
            max: 1,
            time: 60000,
            errors: ['time'],
        })

        return collected.first()
    } catch (collected) {
        msg.reply('bookmark saving command aborted! :(')

        return null
    }
}

const getBookmarkName = async msg => {
    const filter = m => {
        if (m.author.bot) return false
        else if (m.content === '') {
            m.reply('bookmark name is cannot be empty')
            m.channel.send('try again')
            return false
        } else if (!/[\w\d가-힣]+/.test(m.content)) {
            m.reply(
                'The bookmark name must be written in numbers, English, and Korean only.',
            )
            m.channel.send('try again')
            return false
        } else return true
    }

    try {
        const collected = await msg.channel.awaitMessages(filter, {
            max: 1,
            time: 60000,
            errors: ['time'],
        })

        return collected.first()
    } catch (collected) {
        msg.reply('bookmark saving command aborted! :(')

        return null
    }
}

module.exports = async msg => {
    msg.curruntDeepth = 1
    msg.curruntCommand = msg.args?.[msg.curruntDeepth]

    if (msg.curruntCommand === 'save') {
        let referencingMessage = null

        if (msg.reference === null) {
            msg.reply('please reference target message!')
            const resOrNull = await getReference(msg)
            if (!resOrNull) return

            referencingMessage = resOrNull
        } else referencingMessage = msg

        let bookmarkName = null

        if (!msg.args[msg.curruntDeepth + 1]) {
            msg.reply('please enter the bookmark name!')
            const resOrNull = await getBookmarkName(msg)
            if (!resOrNull) return
            bookmarkName = resOrNull
        } else bookmarkName = msg.args[curruntDeepth + 1]

        console.log(`bookmarkName: ${bookmarkName}`)

        // msg.reply(threeDataToLink(msg.reference))

        try {
            await DB()
                .ref('bookmark')
                .update({
                    [bookmarkName]: msg.reference,
                })
        } catch (err) {
            console.error(err)
            msg.reply('error occurred during storing bookmark data!')

            chatDecorater.codeblock(err, 'sh')
        }
    }
}
