import express = require('express');
import path = require('path');
import bodyParser = require('body-parser');
import morgan = require('morgan');
import compress = require('compression');

const app = express();

// Load local environment variables in development
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').load();
}
let production = process.env.NODE_ENV === 'production';

// OAuth login
import session = require('express-session');
import passport = require('passport');
require('./passport')(passport);

// Database
import mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
import { User, IUserModel } from './user';

/** True = get response details on served node modules **/
let verboseLogging = false;

/** Gzip files in production **/
if (production) {
  app.use(compress());
}

app.use(bodyParser.json());

app.use(morgan('dev', {
  skip: (req, res) => {
    if (verboseLogging) return false;
    else return req.baseUrl === '/scripts';
  }
}));

app.use( express.static( path.join(__dirname, '../../dist') ));

app.use('/scripts', express.static( path.join(__dirname, '../../node_modules') ));
app.use('/app', express.static( path.join(__dirname, '../../dist/app') ));

app.use(session({
	secret: 'secretRandSessionPass',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/test', (req, res) => {
  res.status(200).end('Data received from server!');
});

/** Pass all non-api routes to front-end router for handling **/ 
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
});

let port = process.env.PORT || 3000;
let server = app.listen(port, () => console.log(`Listening on port ${port}...`));