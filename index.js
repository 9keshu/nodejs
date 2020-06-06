const express = require('express');
const port = 8000;
const app = express();
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
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
app.use('/',require('./routes'));
//setting view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error while running server ${err}`);
    }
    console.log(`Server is up and running on port ${port}`);
});