const User = require('../models/user');

module.exports.profile = function(req,res){
    res.render('users.ejs',{
        title:'Codeil | Profile'
    });
}

module.exports.sign_in = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    res.render('sign-in.ejs',{
        title: 'Codeil | Sign In'
    });
}

module.exports.sign_up = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    res.render('sign-up.ejs',{
        title: 'Codeil | Sign Up'
    });
}

module.exports.create = function(req,res){
    // console.log(req.body.password);
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){

        if(err){
            console.log('Error while finding the email!');
            return;
        }

        if(!user){

            User.create(req.body,function(err,user){
                    if(err){
                        console.log('Error while creating user!');
                    }
                    console.log('user created!',user) ;
                    return res.redirect('/users/sign-in');
            });
        }
        else{
            // console.log('use already exists!');
            return res.redirect('back');
        }
    });
}

//sign in and create session  for the user
module.exports.createSession = function(req,res){
    return res.redirect('/users/profile');
}


module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/');
}