const { rando } = require('@nastyox/rando.js')

module.exports = msg => {
    let positive_emoji = ['👌', '❤', '✅', '👍', '😉']
    // noinspection JSIgnoredPromiseFromCall
    msg.react(rando(positive_emoji).value)
}
