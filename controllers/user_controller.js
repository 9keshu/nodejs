const User = require('../models/user');
const fs = require('fs');
const path = require('path');
module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        res.render('users.ejs',{
            title:'Codeil | Profile',
            profile_user:user
        });
    });
    
}

module.exports.update = async function(req,res){
    
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            //multipart forms is not parsed by req.params.id so user multer
            User.uploadedAvatars(req,res,function(err){
                if(err){console.log('***Multer error ***',err);}
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    //this is savting the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });


        }
        catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }
    else{
        req.flash('error','Unauthorized!');
        return res.status(401).send('Unauthorized');

    }
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
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}


module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','You have logged out!');
    return res.redirect('/');
}