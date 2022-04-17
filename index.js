require('dotenv').config()

const express=require('express')
const ejsLayouts = require("express-ejs-layouts")

const resourceController = require('./controllers/resourceControllers')

require('ejs')

const app = express()

app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use(resourceController)

app.set('port', process.env.PORT || 8001)

app.listen(app.get('port'), () => {
    console.log(`PORT: ${app.get('port')}`);
});

