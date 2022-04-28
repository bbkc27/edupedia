require('dotenv').config()

const express=require('express')
const methodOverride = require('method-override')
const ejsLayouts = require("express-ejs-layouts")
const passport = require("passport")
const session = require('express-session')
const Login = require('./models/login-model')
const LocalStrategy = require('passport-local').Strategy; 

const resourceController = require('./controllers/resourceControllers')

require('ejs')

const app = express()
app.use(express.static('public'));

app.set('view engine', 'ejs')

app.use(ejsLayouts)
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(Login.authenticate()));
passport.serializeUser(Login.serializeUser()); 
passport.deserializeUser(Login.deserializeUser());
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"));

app.use(resourceController)

app.set('port', process.env.PORT || 8001)

app.listen(app.get('port'), () => {
    console.log(`PORT: ${app.get('port')}`);
});

