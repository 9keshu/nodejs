const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const port = 8000;
const app = express();
require('./config/view-helpers')(app);
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportgoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
//set - up the chat server
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('Chat server is listening to port :: 5000') ;
const path = require('path');

if(env.name == 'development'){
    app.use(sassMiddleware({
        src: path.join(__dirname,env.asset_path,'scss'),
        dest:path.join(__dirname,env.asset_path,'css'),
        debug:true,
        outputStyle:'extended',
        prefix:'/css'
    }));
    
}
//setting up layouts
app.use(expressLayout);
//setting the static files
app.use(express.static(path.join(__dirname,env.asset_path)));
//make the upload path avaiable to the browser
app.use('/uploads',express.static(__dirname + '/uploads'))
//setting the link tags in the head and script in bottom
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//middleware 
app.use(cookieParser());
app.use(express.urlencoded());
// use router to route
app.use(logger(env.morgan.mode,env.morgan.options));
//setting view engine
app.set('view engine','ejs');
app.set('views','./views');
//mongo store is used to strore the session cookie in the db
app.use(session({
    name:'codeil',
    secret:env.session_cookie_key,
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
app.use(flash());
app.use(customMware.setFlash);

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error while running server ${err}`);
    }
    console.log(`Server is up and running on port ${port}`);
});