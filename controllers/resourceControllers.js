
const express = require('express')
const Resource = require('../models/resource-model')

const router = express.Router()

router.get('/all', (req, res) => {
    Resource.find({})
    .then((resources) => res.send(resources))
    .catch(console.error)
})

router.get('/ela', (req, res) => {
    Resource.find({subject: "ela"})
    .then((ela) => res.send(ela))
    .catch(console.error)
})

router.get('/math', (req, res) => {
    Resource.find({subject: "math"})
    .then((math) => res.send(math))
    .catch(console.error)
})

router.get('/science', (req, res) => {
    Resource.find({subject: "science"})
    .then((science) => res.send(science))
    .catch(console.error)   
})

router.get('/:keyword', (req, res) => {
    Resource.find({keywords: req.params.keyword})
    .then((resources) => res.send(resources))
    .catch(console.error)
})

// router.get('/new', (req, res) => {
//     res.render('new')
// })

router.post('/new', (req, res) => {
    Resource.create(req.body)
    .then(() => res.redirect('/all'))
})

router.delete('/:id', (req, res) => {
    Resource.findOneAndRemove({_id: req.params.id})
    .then(() => res.redirect('/all'))
})

module.exports = router;