const http = require('http');
const path = require('path');
const methods = require('methods');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const errorhandler = require('errorhandler');
const mongoose = require('mongoose');

const isProduction = process.env.NODE_ENV === 'production';

const app = express();
app.use(cors());

// Config
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: 'conduit',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false,
}));

if (!isProduction) {
  app.use(errorhandler());
}

if(isProduction){
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost/conduit');
  mongoose.set('debug', true);
}

require('./models/User');
require('./config/passport');

app.use(require('./routes'));

/// Catch 404
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// Error handlers
if (!isProduction) {
  app.use((err, req, res, next) => {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// Production error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

// Listen
const server = app.listen( process.env.PORT || 8000, () => {
  console.log('Listening on port ' + server.address().port);
});
