const express = require('express');
const port = 8000;
const app = express();

//middleware 
// use router to route
app.use('/',require('./routes'));
app.listen(port,function(err){
    if(err){
        console.log(`Error while running server ${err}`);
    }
    console.log(`Server is up and running on port ${port}`);
});