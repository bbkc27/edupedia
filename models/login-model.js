const mongoose = require('../db/connection');
const passportLocalMongoose = require('passport-local-mongoose');

const LoginSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
    },
    favorites: {
        type: Array
    }

})

LoginSchema.plugin(passportLocalMongoose);

const Login = mongoose.model("Login", LoginSchema)

module.exports = Login