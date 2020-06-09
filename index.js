const express = require('express');
const port = 8000;
const app = express();
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));
//setting up layouts
app.use(expressLayout);
//setting the static files
app.use(express.static('./assets'));
//setting the link tags in the head and script in bottom
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//middleware 
app.use(cookieParser());
app.use(express.urlencoded());
// use router to route

//setting view engine
app.set('view engine','ejs');
app.set('views','./views');
//mongo store is used to strore the session cookie in the db
app.use(session({
    name:'codeil',
    secret:"jaisingaji",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store :new MongoStore({
        mongooseConnection:db,
        autoRemove:'disable'
    }),
    function(err){
        console.log(err || 'connect mongodb set-up ok' );
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error while running server ${err}`);
    }
    console.log(`Server is up and running on port ${port}`);
});