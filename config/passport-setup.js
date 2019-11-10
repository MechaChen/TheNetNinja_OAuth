const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.use(
    new GoogleStrategy({
        // options for the google strat
        clientID: '989015200538-h0jq022gfhgohtqa4qokrsrjo44br1s5.apps.googleusercontent.com',
        clientSecret: 'o3ls11r7LRilHCz9JRzw5hJn'
    }), () => {
        // passport callback function
    }
);