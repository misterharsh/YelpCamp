var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrat  = require("passport-local"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");

var app = express();

// Clear database
seedDB();

// Needed to work with json data
app.use(bodyParser.urlencoded({extended: true}));
// __dirname is a safe way to always have correct path access to public
app.use(express.static(__dirname + "/public"));
// Allows you to not have to append .ejs when referring to the files
app.set("view engine", "ejs");

// Connect to database: yelp_camp
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});

// Passport auth config
app.use(require("express-session")({
    secret: "Random text for secret setup",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrat(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Pass current user to every route
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

// Define routes
app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds});
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
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground}); 
        }
    });
});

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
        }
    });
});

// Authentication Routes
app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
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

app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {
    // Does nothing since middleware handles everything
});

app.get("/logout", function(req, res) {
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

app.listen(3000, function() {
    console.log("The yelp camp server has started on port 3000...");
});
