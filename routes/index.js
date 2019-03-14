var express = require('express'),
    passport = require('passport');

var router  = express.Router();
var User = require('../models/user');

// Landing route 
router.get("/", function(req, res) {
    res.render("landing");
});

// Authentication Routes
router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    // You pass the password as second arg so that passport can return a user
    // with the hash of the password -- never want to store password directly
    User.register(newUser, req.body.password, function(err, user) {
        if(err) { 
            console.log(err);
            res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/campgrounds");
        })
    });
})

router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {
    // Does nothing since middleware handles everything
});

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

// Checking user authentication on request (middleware)
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
