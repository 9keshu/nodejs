const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeil_development');
db = mongoose.connection;
db.on('error',console.error.bind(console,"Error in Connecting the database"));

db.once('open',function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;