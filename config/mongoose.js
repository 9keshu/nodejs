const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://localhost/${env.db}`);
db = mongoose.connection;
db.on('error',console.error.bind(console,"Error in Connecting the database"));

db.once('open',function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;