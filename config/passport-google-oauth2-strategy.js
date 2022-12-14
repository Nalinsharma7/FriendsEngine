const passport = require('passport');
const googleStrategy =require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// Tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID:"909136429324-eo7dkp7rna9rd3tel342u2isep1o33fi.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },

    function(accessToken, refreshToken, profile, done){
        //find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err){console.log('Error in google strategy passport',err);return;}
            console.log(accessToken, refreshToken);
            console.log(profile);
            if (user){
                //if found,set this user as req.user
                return done(null, user);
            }else{
                //if not found, create the user and set it as req.user
                User.create({
                    name:profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if (err){console.log('Error in creating user',err);return;}

                    return done(null, user);
                })
            }

        })
    }

));

module.exports = passport;