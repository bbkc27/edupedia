

const express = require('express')
const passport = require('passport')
const connectEnsureLogin = require('connect-ensure-login')
const Resource = require('../models/resource-model')
const Login = require('../models/login-model')

const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/auth', (req, res) => {
    res.render('logIn')
})

router.get('/logout', (req, res) => {
    res.render('logOut')
})

router.get('/signup', (req, res) =>{
    res.render('signUp')
})

router.get('/all', (req, res) => {
    Resource.find({})
    .sort({"favorite": 'desc'})
    .then((resources) => res.render('search',{resources}))
    .catch(console.error)
})

router.get('/ela', (req, res) => {
    Resource.find({subject: "ela"})
    .sort({"favorite": 'desc'})    
    .then((resources) => res.render('search', {resources}))
    .catch(console.error)
})

router.get('/math', (req, res) => {
    Resource.find({subject: "math"})
    .sort({"favorite": 'desc'})
    .then((resources) => res.render('search', {resources}))
    .catch(console.error)
})

router.get('/science', (req, res) => {
    Resource.find({subject: "science"})
    .sort({"favorite": 'desc'})
    .then((resources) => res.render('search', {resources}))    
    .catch(console.error)   
})


router.get('/favorites', connectEnsureLogin.ensureLoggedIn('/auth'), (req, res) => {
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
    Resource.create(req.body)
    .then(() => res.redirect('/all'))
})


router.post('/signup', async (req, res) => {
    console.log(req.body)
    Login.register(new Login({username: req.body.username}), req.body.password, (err, user) => {
        if(err){
            console.log(err);
            return res.render("signUp");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/favorites");
        });
    });

})


router.post('/auth', passport.authenticate('local', {
    failureRedirect: '/auth',
    successRedirect: '/favorites',
  }),
  (req, res) => {
    console.log(req.user);
  })


router.post('/logout', function (req, res){
      req.logout();
      res.redirect('/auth')
  });

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
    Resource.findById(req.params.id)
    .then(resource => {
        resource.favorite = !resource.favorite
        Resource.findByIdAndUpdate(req.params.id, resource, {new: true})
        .then(data => {
        res.redirect(`/${req.params.id}/show`)
        })
    })
    
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