const firebase = require('firebase')
const chalk = require('chalk')

let isAlreadyInitialized = false

function initAndReturnDatabase() {
    if (isAlreadyInitialized) {
        // console.info(`firebase is already initialized`)

        return firebase.database
    }

    const firebaseConfig = {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        databaseURL: process.env.DATABASE_URL,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
        measurementId: process.env.MEASUREMENT_ID,
    }

    firebase.initializeApp(firebaseConfig)
    isAlreadyInitialized = true
    console.log(chalk.keyword('orange')('firebase is now initialized!'))

    return firebase.database
}

module.exports = initAndReturnDatabase
