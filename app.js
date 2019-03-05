var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Connect to database: yelp_camp
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});

// Define routes
app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: campgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res) {
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

app.get("/campgrounds/new", function(req, res) {
    res.render("newCampground");
});

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground}); 
        }
    });
});

app.listen(3000, function() {
    console.log("The yelp camp server has started on port 3000...");
});
