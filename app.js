var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrat  = require("passport-local"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");

var indexRoutes       = require('./routes/index'),
    campgroundRoutes = require('./routes/campgrounds'),
    commentRoutes    = require('./routes/comments');

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

// Import and use routes
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function() {
    console.log("The yelp camp server has started on port 3000...");
});
