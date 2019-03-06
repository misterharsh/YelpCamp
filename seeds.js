var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var cgData = [ 
    {
        name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1495685288924-ce05d1036b24?ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut urna nunc, rhoncus ut accumsan vitae, lacinia sed mauris. Donec volutpat elementum diam, at consequat orci aliquet venenatis. Donec sed finibus sapien. Duis ut blandit ante, nec volutpat dui. Sed ac leo id lacus mollis tincidunt at at ligula. Aliquam semper urna ac augue laoreet, quis eleifend quam laoreet. Praesent quam sem, convallis pharetra aliquet at, hendrerit sit amet purus. Sed porta neque ac odio ullamcorper hendrerit ultrices ut ante. Quisque sed mauris vitae massa mollis bibendum ut in erat. Ut consequat efficitur lectus vitae rhoncus. Ut semper felis in hendrerit consectetur. Maecenas porta consectetur tellus non vestibulum. Phasellus aliquet magna at odio eleifend, quis semper ex rutrum. Quisque mi lorem, venenatis sed ante at, commodo vestibulum ante. Aliquam ullamcorper, neque et porttitor lobortis, nibh massa laoreet neque, sit amet aliquet ipsum augue ac dolor. Sed nisi est, elementum vel posuere vel, lobortis ut risus."
    },
    {
        name: "Desert Mesa",
        image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut urna nunc, rhoncus ut accumsan vitae, lacinia sed mauris. Donec volutpat elementum diam, at consequat orci aliquet venenatis. Donec sed finibus sapien. Duis ut blandit ante, nec volutpat dui. Sed ac leo id lacus mollis tincidunt at at ligula. Aliquam semper urna ac augue laoreet, quis eleifend quam laoreet. Praesent quam sem, convallis pharetra aliquet at, hendrerit sit amet purus. Sed porta neque ac odio ullamcorper hendrerit ultrices ut ante. Quisque sed mauris vitae massa mollis bibendum ut in erat. Ut consequat efficitur lectus vitae rhoncus. Ut semper felis in hendrerit consectetur. Maecenas porta consectetur tellus non vestibulum. Phasellus aliquet magna at odio eleifend, quis semper ex rutrum. Quisque mi lorem, venenatis sed ante at, commodo vestibulum ante. Aliquam ullamcorper, neque et porttitor lobortis, nibh massa laoreet neque, sit amet aliquet ipsum augue ac dolor. Sed nisi est, elementum vel posuere vel, lobortis ut risus."
    },
    {
        name: "Canyon Floor",
        image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut urna nunc, rhoncus ut accumsan vitae, lacinia sed mauris. Donec volutpat elementum diam, at consequat orci aliquet venenatis. Donec sed finibus sapien. Duis ut blandit ante, nec volutpat dui. Sed ac leo id lacus mollis tincidunt at at ligula. Aliquam semper urna ac augue laoreet, quis eleifend quam laoreet. Praesent quam sem, convallis pharetra aliquet at, hendrerit sit amet purus. Sed porta neque ac odio ullamcorper hendrerit ultrices ut ante. Quisque sed mauris vitae massa mollis bibendum ut in erat. Ut consequat efficitur lectus vitae rhoncus. Ut semper felis in hendrerit consectetur. Maecenas porta consectetur tellus non vestibulum. Phasellus aliquet magna at odio eleifend, quis semper ex rutrum. Quisque mi lorem, venenatis sed ante at, commodo vestibulum ante. Aliquam ullamcorper, neque et porttitor lobortis, nibh massa laoreet neque, sit amet aliquet ipsum augue ac dolor. Sed nisi est, elementum vel posuere vel, lobortis ut risus."
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