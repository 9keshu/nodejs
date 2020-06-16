const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

//for encryption
let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'codeil'
}

passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){
    User.findById(jwtPayLoad._id,function(err,user){
        if(err){console.log('Error in findong the user from JWT ');return;}

        if(user){
            return done(null,user);
        }
        else{
            return done(null,flase);
        }
    });
}));


module.exports = passport;