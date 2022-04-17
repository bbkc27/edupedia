const Resource = require('../models/resource-model')
const seedData = require('./resourceSeeds.json')

Resource.deleteMany({})
    .then (() => {
        Resource.insertMany(seedData)
        .then(console.log)
        .catch(console.error)
        .finally(() => {
            process.exit();
        })
    })