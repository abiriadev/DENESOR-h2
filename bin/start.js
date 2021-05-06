const client = require('./../index')
const initFirebase = require('../src/firebase')

console.log('[{ START }]')
// initFirebase()
client.login(process.env.TOKEN)
