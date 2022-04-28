
//Harold iD: 6269e4dc13307b7d1efc2ecd

const express = require('express')
const session = require('express-session')
const passport = require('passport')
const Resource = require('../models/resource-model')
const Login = require('../models/login-model')

const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/auth', (req, res) => {
    res.render('login')
})


router.get('/signup', (req, res) =>{
    res.render('signUp')
})

router.get('/all', (req, res) => {
    Resource.find({})
    .sort("favorite")
    .then((resources) => res.render('search',{resources}))
    .catch(console.error)
})

router.get('/ela', (req, res) => {
    Resource.find({subject: "ela"})
    .sort("favorite")
    .then((resources) => res.render('search', {resources}))
    .catch(console.error)
})

router.get('/math', (req, res) => {
    Resource.find({subject: "math"})
    .sort("favorite")
    .then((resources) => res.render('search', {resources}))
    .catch(console.error)
})

router.get('/science', (req, res) => {
    Resource.find({subject: "science"})
    .sort("favorite")
    .then((resources) => res.render('search', {resources}))    
    .catch(console.error)   
})


router.get('/favorites', (req, res) => {
    Resource.find({favorite: true})
    .then((resources) => { res.render('search', {resources})})
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
    Resource.create({...req.body, Login:"6269e4dc13307b7d1efc2ecd"})
    .then(() => res.redirect('/all'))
})


router.post('/signup', async (req, res) => {

    try {
        const username = req.body.username;
        const password = req.body.password;
        const oldUser = await Login.findOne({username: username});

        if(oldUser){
            res.redirect("/signup")
        }

        const user = await Login.create({username: username, password: password});
        res.redirect('/auth');
    } catch (err){
        console.log(err);
    }

})


router.post('/auth', async (req, res) => {
    try{
        const username = req.body.username;
        const password = req.body.password;

        if (!(username && password)){
            res.redirect("/auth")
        }

        const user = await Login.findOne({username: username, password: password});

        if (user) {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/favorites")
            });

        } else {
        res.redirect("/auth")
        }
    } catch (err) {
        console.log(err);
    }
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

router.put('/:id/favorite', (req, res) => {
    if (req.session.loggedIn){
        res.send("saved to favorites")
        Resource.findById(req.params.id)
        .then(resource => {
            resource.favorite = !resource.favorite
            Resource.findByIdAndUpdate(req.params.id, resource, {new: true})
            .then(data => {
                res.redirect(`/${req.params.id}/show`)
            })
        })
    }
})

router.put('/:id/edit', (req, res) => {
    Resource.findById(req.params.id)
    .then(resource => {
        resource.favorite = !resource.favorite
        Resource.findByIdAndUpdate(req.params.id, resource, {new: true})
        .then(()=> {
            res.redirect(`/${req.params.id}/edit`)
        })
    })
})


router.put('/:id/all', (req, res) => {
    Resource.findById(req.params.id)
    .then(resource => {
        resource.favorite = !resource.favorite
        Resource.findByIdAndUpdate(req.params.id, resource, {new: true})
        .then(() => {
            res.redirect('/all')
        })
    })
})

router.delete('/:id', (req, res) => {
    Resource.findOneAndRemove({_id: req.params.id})
    .then(() => res.redirect('/all'))
})

module.exports = router;