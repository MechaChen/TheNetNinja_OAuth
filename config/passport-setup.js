const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.use(
    new GoogleStrategy({
        // options for the google strat
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exiest in our db
        User.findOne({ googleId: profile.id })
            .then((currentUser) => {
                if (currentUser) {
                    // already have the user
                    console.log(`user is:${currentUser}`);
                } else {
                    // if note, create user in our db
                    new User({
                        username: profile.displayName,
                        googleId: profile.id
                    })
                    .save()
                    .then((newUser) => {
                        console.log(`new user created: ${newUser}`);
                    });
                }
            })
    })
);