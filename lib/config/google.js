const google = {
  'clientID'      : process.env.GOOGLE_CLIENT_ID,
  'clientSecret'  : process.env.GOOGLE_CLIENT_SECRET,
  'callbackURL'   : process.env.GOOGLE_CALLBACK_URL,
  'scope' : ['profile', 'email']
}

module.exports = google;
