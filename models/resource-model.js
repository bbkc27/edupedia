
const mongoose = require('../db/connection');

const ResourceSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    subject: {
        type: Array,
    },
    keywords: {
        type: Array
    }
})

const Resource = mongoose.model("Resource", ResourceSchema)

module.exports = Resource