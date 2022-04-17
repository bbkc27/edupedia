
const express = require('express')
const Resource = require('../models/resource-model')

const router = express.Router()

router.get('/', (req, res) => {
    Resource.find({})
    .then((resources) => res.send(resources))
    .catch(console.error)
})

module.exports = router;