

require('dotenv').config()
const express=require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('port', process.env.PORT || 8001)

app.listen(app.get('port'), () => {
    console.log(`PORT: ${app.get('port')}`);
});

