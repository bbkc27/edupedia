
const { Schema } = require('../db/connection');
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
        type: [String]
    },
    keywords: {
        type: [String]
    },
    favorite: {
        type: Boolean
    },
    Login: {
        type: Schema.Types.ObjectId, ref:"Login"
    }
})

const Resource = mongoose.model("Resource", ResourceSchema)

module.exports = Resource