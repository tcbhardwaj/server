const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    console.log("serializeUser:",user);
    done(null, user);
});
passport.deserializeUser((id, done) => {
    User.find(id).then(user => {
        done(null, user);
    });
});
passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    },
    (accessToken, refreshToken, profile, done) => { 
        console.log("profile", profile);   
        User.find({googleId: profile.id}).then(existingUser => {
            if(existingUser[0]) {
                //user exist
                console.log("existingUser:", existingUser);
               done(null, existingUser); 
            } else {
                //user does not exist
                new User({googleId: profile.id})
                .save()
                .then(user => done(null, user));
            }
        }); 
    }
)
);
