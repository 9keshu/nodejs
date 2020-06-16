const passport =require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use new strategy for google login

passport.use(new googleStrategy({
    clientID:'208646237670-br5vgla382brp71vn7jt3un8s88mt46l.apps.googleusercontent.com',
    clientSecret:'0V3s2Fqo-BpqessSdnPmth1D',
    callbackURL:'http://localhost:8000/users/auth/google/callback'
},
    function(accessToken,refreshToken,profile,done){
        //find  the user
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google strategy passport',err);return;}

            console.log(accessToken,refreshToken);
            console.log(profile);

            if(user){
                // if found the user, set it as req.user
                return done(null,user);
            }
            else{
                // if not found ,create the user and set it as req.user(signin the user)
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){console.log('error in creating user ',err);return;}
                    return done(null,user);
                });
            }
        });
    }
));

module.exports = passport;