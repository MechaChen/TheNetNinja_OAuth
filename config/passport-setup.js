const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    // use the currentUser/newUser to fire done & take currentUser/newUser's id
    // and send to Cookie
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // take the id stored in Cookie & deserialize it
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for the google strat
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exiest in our db
        console.log('profile', profile);
        User.findOne({ googleId: profile.id })
            .then((currentUser) => {
                if (currentUser) {
                    // already have the user
                    console.log(`user is:${currentUser}`);
                    done(null, currentUser);  // will go to passport.serializeUser
                } else {
                    // if note, create user in our db
                    new User({
                        username: profile.displayName,
                        googleId: profile.id,
                        thumbnail: profile._json.picture
                    })
                    .save()
                    .then((newUser) => {
                        console.log(`new user created: ${newUser}`);
                        done(null, newUser);   // will go to passport.serializeUser
                    });
                }
            })
    })
);