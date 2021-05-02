const discord = require('discord.js')

new discord.Client()
    .on('ready', console.log.bind(this, 'ready!'))
    .on('message', async msg => {
        if (msg.content !== '!hello') return

        msg.reply('yes')
    })
    .login(process.env.TOKEN)
