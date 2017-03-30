const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const googleConfig = require('../config/google');
const jwt = require('jsonwebtoken');

module.exports = function(app) {
  app.get('/oauth/google', passport.authenticate('google', {scope: googleConfig.scope}));
  app.get('/oauth/google/callback', function(req, res, next) {
    passport.authenticate('google', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/?message=Failed%20to%20login'); }
      return res.redirect('/?token='+user.token);
    })(req, res, next);
  });

  passport.use(new GoogleStrategy({
    clientID        : googleConfig.clientID,
    clientSecret    : googleConfig.clientSecret,
    callbackURL     : googleConfig.callbackURL,
  },
  function(token, refreshToken, profile, done) {

    const user = {
      name: profile.displayName,
      email: profile.emails[0].value,
      profileId: profile.id,
      profileType: 'google',
    }
    user.token = jwt.sign(user, 'hihi', {expiresIn: '10s'});
    done(null, user);
  }));
};
