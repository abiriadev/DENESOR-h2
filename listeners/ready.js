const client = require('../client')

module.exports = async () => {
    console.log(`${client.user.tag} is ready!`)

    try {
        client.host = (await client.fetchApplication()).owner

        // noinspection JSUnresolvedFunction
        client.host.send(`START IN ${new Date()}`)
    } catch (err) {
        console.error(err)
    }
}
