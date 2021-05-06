// noinspection JSIgnoredPromiseFromCall,ES6MissingAwait

const client = require('./client')
const ready = require('./listeners/ready.js')
const chalk = require('chalk')
const message = require('./listeners/message.js')
const guildMemberAdd = require('./listeners/guildMemberAdd')

// noinspection JSUnresolvedFunction
module.exports = client
    .on('debug', info => console.info(chalk.cyan(info)))
    .on('ready', ready)
    .on('message', message)
    .on('guildMemberAdd', guildMemberAdd)
