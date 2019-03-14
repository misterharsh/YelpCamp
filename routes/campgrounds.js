var express = require('express');
var router  = express.Router();

var Campground = require('../models/campground');

router.get("/", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
});

router.post("/", function(req, res) {
    let newCampground = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    };

    Campground.create(newCampground, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
   
});

router.get("/new", function(req, res) {
    res.render("campgrounds/new");
});

router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground}); 
        }
    });
});

module.exports = router;
