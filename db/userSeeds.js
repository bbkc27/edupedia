const Login = require('../models/login-model')
const loginData = require('./userSeeds.json')

Login.deleteMany({})
    .then(() => {
        return Login.insertMany(loginData)
    })
    .finally(() => process.exit())