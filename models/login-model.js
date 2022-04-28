const mongoose = require('../db/connection');

let passportLocalMongoose = require('passport-local-mongoose');

const LoginSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    favorites: {
        type: Array
    }

})

LoginSchema.plugin(passportLocalMongoose);

const Login = mongoose.model("Login", LoginSchema)

module.exports = Login