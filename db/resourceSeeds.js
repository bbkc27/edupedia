const Resource = require('../models/resource-model')
const seedData = require('./resourceSeeds.json')

Resource.deleteMany({})
    .then (() => {
        return Resource.insertMany(seedData)
    })
    .finally(() => process.exit())