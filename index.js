//use path module
const path = require("path");
//use express module
const express = require("express");
//use hbs view engine
const hbs = require("hbs");
//use bodyParser middleware
const bodyParser = require("body-parser");

// database
const conn = require("./public/config/config.js")

var session = require('express-session');

// var redis = require('redis');
// var redisStore = require('connect-redis')(session);
// var client = redis.createClient();


const app = express();

// routes
const product = require("./public/route/product.js")

const login = require("./public/route/login.js")

const register = require("./public/route/register.js")

const post = require("./public/route/post.js")

const home = require("./public/route/home.js")



//connect to database
conn.connect(err => {
    if (err) throw err;
    console.log("Mysql Connected...");
});

//set views file
app.set("views", path.join(__dirname, "views"));
//set view engine
app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
//set public folder as static folder for static file
app.use("/assets", express.static(__dirname + "/public"));

var redis = require("redis"),
    client = redis.createClient(),
    RedisStore = require('connect-redis')(session);


//using sessesion
app.use(session({
    secret: 'secret',
    store: new RedisStore({
        client: client,
        host: 'localhost',
        port: 6379,
        prefix: "session:",
        db: 0,
        saveUninitialized: false,
        resave: false
    }),

    resave: true,
    saveUninitialized: true

}));



// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function(err) {
    console.log("Error " + err);
});

//route for homepage
app.get("/", home);



//prodcut routes
app.use("/product", product);

//login routes
app.use("/login", login);

//register routes
app.use("/register", register);


app.use("/", post);


//server listening
app.listen(3000, () => {
    console.log("Server is running at port 3000");
});