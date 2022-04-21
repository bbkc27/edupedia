
const express = require('express')
const Resource = require('../models/resource-model')

const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/all', (req, res) => {
    Resource.find({})
    .then((resources) => res.render('search',{resources}))
    .catch(console.error)
})

router.get('/ela', (req, res) => {
    Resource.find({subject: "ela"})
    .then((resources) => res.render('search', {resources}))
    .catch(console.error)
})

router.get('/math', (req, res) => {
    Resource.find({subject: "math"})
    .then((resources) => res.render('search', {resources}))
    .catch(console.error)
})

router.get('/science', (req, res) => {
    Resource.find({subject: "science"})
    .then((resources) => res.render('search', {resources}))    
    .catch(console.error)   
})


router.get('/new', (req, res) => {
    res.render('new')
})

router.get('/:keyword', (req, res) => {
    Resource.find({keywords: req.query.keywords})
    .then((resources) => res.render('search', {resources}))
    .catch(console.error)
})

router.get('/:id/show', (req, res) => {
    const id = req.params.id
    Resource.findById(id)
    .then((resource) => {
        res.render('show', resource)
    })
    .catch(console.error)
})

router.get('/:id/edit', (req, res) => {
    const id = req.params.id;
    Resource.findById(id)
    .then((resource) => {
        res.render('edit', resource)
    })
    .catch(console.error);
})

router.post('/new', (req, res) => {
    Resource.create(req.body)
    .then(() => res.redirect('/all'))
})

router.put('/:id', (req, res) => {
    Resource.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true}
    )
    .then((resource) => {
        res.render('show', resource)
    })
    .catch(console.error);
})

router.delete('/:id', (req, res) => {
    Resource.findOneAndRemove({_id: req.params.id})
    .then(() => res.redirect('/all'))
})

module.exports = router;