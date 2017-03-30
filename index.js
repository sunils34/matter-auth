var env = process.env.NODE_ENV || 'development';
//load dev vars from local config
if(env == 'development') {
  require('dotenv').config();
}

var express = require('express');
var setupAuth = require('./lib/auth');

var app = express();

// setup templating
app.set('views', __dirname + '/lib/views');
app.engine('html', require('ejs').renderFile);

setupAuth(app);


//TODO set up a 404 page
app.listen(process.env.PORT || 4001);
