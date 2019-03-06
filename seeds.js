var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var cgData = [ 
    {
        name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1495685288924-ce05d1036b24?ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
        description: "This is the first campground. Very beautiful place."
    },
    {
        name: "Desert Mesa",
        image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
        description: "This is the second campground. Very beautiful place."
    },
    {
        name: "Canyon Floor",
        image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
        description: "This is the third campground. Very beautiful place."
    }
]

function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Removed campgrounds");
            // Create some campgrounds
            cgData.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Campground added");
                        // Create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet!",
                                author: "Homer"
                            }, function(err, comment) {
                                if(err) {
                                    console.log(err);
                                } else {
                                    console.log("Comment added")
                                    campground.comments.push(comment);
                                    campground.save();
                                }
                            }
                        );
                    }
                });
            });
        }
    });
}

module.exports = seedDB;