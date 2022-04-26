
const mongoose = require('mongoose')

const mongoURI = 
process.env.NODE_ENV === 'production'
? process.env.DB_URL
: "mongodb+srv://briana_c:0820@cluster0.3lrnm.mongodb.net/edupedia-dev?retryWrites=true&w=majority"

mongoose.connect(`${mongoURI}`)
    .then((instance) => console.log(`Connected to db: ${instance.connections[0].name}`))
    .catch((error) => console.log('Connection Failed!', error));


module.exports = mongoose;