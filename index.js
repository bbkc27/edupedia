require('dotenv').config()

const express=require('express')
const methodOverride = require('method-override')
const ejsLayouts = require("express-ejs-layouts")
const passport = require("passport")
const session = require("express-session")
const Login = require('./models/login-model')

const resourceController = require('./controllers/resourceControllers')

require('ejs')

const app = express()
app.use(express.static('public'));

app.set('view engine', 'ejs')

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize()); 
app.use(passport.session());
passport.use(Login.createStrategy());
passport.serializeUser(Login.serializeUser());
passport.deserializeUser(Login.deserializeUser());
app.use(ejsLayouts)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"));

app.use(resourceController)

app.set('port', process.env.PORT || 8001)

app.listen(app.get('port'), () => {
    console.log(`PORT: ${app.get('port')}`);
});

