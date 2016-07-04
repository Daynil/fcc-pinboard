let TwitterStrategy = require('passport-twitter').Strategy;
import { User } from './user';

module.exports = (passport) => {
  passport.serializeUser( (user, done) => done(null, user.twitterID));

  passport.deserializeUser( (id, done) => {
    User.findOne({ 'twitterID': id }, (err, user) => done(err, user));
  });

  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: 'https://daynil-fcc-nightlife.herokuapp.com/auth/twitter/callback'
  },
    (token, tokenSecret, profile, done) => {
      User.findOne({ 'twitterID': profile.id }, (err, user) => {
        if (err) return done(err);
        if (user) {
          return done(null, user);
        }
        else {
          let newUser = new User();
          newUser.twitterID = profile.id;

          newUser.save( (err) => {
            if (err) throw err;
            return done(null, newUser);
          })
        }
      });
    }
  ));

}