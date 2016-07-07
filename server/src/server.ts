import express = require('express');
import path = require('path');
import bodyParser = require('body-parser');
import morgan = require('morgan');
import compress = require('compression');
import _ = require('lodash');

const app = express();

import { logError, mongoToObj } from './node-helpers';

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
import { User as IUser } from '../../src/app/shared/user.model';
import { User, IUserDoc } from './user';
import { Pin as IPin } from '../../src/app/shared/pin.model';
import { Pin, IPinDoc } from './pin';

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

app.post('/api/pin', (req, res) => {
	let pin: IPin = req.body;
	let newPin = new Pin();
	newPin.title = pin.title;
	newPin.imageUrl = pin.imageUrl;
	newPin.likes = pin.likes;
	newPin.owner = pin.owner;
	newPin.save(err => {
		if (err) logError(res, 'Pin create error', err);
		else res.status(200).json({message: 'Pin created'});
	});
});

app.post('/api/deletepin', (req, res) => {
	let pin: IPin = req.body;
	Pin
		.remove({ title: pin.title, 
							imageUrl: pin.imageUrl, 
							owner: pin.owner }, err => {
			if (err) logError(res, 'Pin remove error', err);
			else res.status(200).json({message: 'Pin deleted'});
		});
});

app.post('/api/like', (req, res) => {
	let pin: IPin = req.body.pin;
	let liker: string = req.body.liker
	Pin
		.findOne({ title: pin.title, 
							 imageUrl: pin.imageUrl, 
							 owner: pin.owner })
		.exec()
		.then((pinDoc: IPinDoc) => {
			let alreadyLiked = _.find(pinDoc.likes, d => d === liker);
			if (typeof alreadyLiked !== 'undefined') {
				let likerIndex = pinDoc.likes.indexOf(alreadyLiked);
				pinDoc.likes.splice(likerIndex, 1);
			} else pinDoc.likes.push(liker);
			pinDoc.save(err => {
				if (err) logError(res, 'Pin save error', err);
				else res.status(200).json({message: 'Pin saved'});
			});
		})
});

app.get('/api/allpins', (req, res) => {
	Pin
		.find({})
		.exec()
		.then((pinDocs: IPinDoc[]) => {
			let pins = [];
			pinDocs.forEach(pinDoc => {
				pins.push(mongoToObj(pinDoc));
			});
			res.status(200).json(pins);
		});
});

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', passport.authenticate('twitter', {successRedirect: '/'}) );

app.get('/auth/checkCreds', (req, res) => {
	let twitterUser = req.user;
	
	if (req.isAuthenticated()) {
		let userInfo: IUser = {
			twitterID: twitterUser.twitterID,
			username: twitterUser.username
		}
		res.send({loggedIn: true, user: userInfo});
	} else res.send({loggedIn: false, user: null});
});

app.get('/auth/logout', (req, res) => {
	req.logout();
	res.json({message: 'logged out'});
});

/** Pass all non-api routes to front-end router for handling **/ 
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
});

let port = process.env.PORT || 3000;
let server = app.listen(port, () => console.log(`Listening on port ${port}...`));