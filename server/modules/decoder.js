var router = require('express').Router();
var pg = require('pg');
var admin = require("firebase-admin");
var config = require('../config/dbconfig');

// var pool = new pg.Pool({
// 	database: config.database
// });

var pool = new pg.Pool(config.pg);

admin.initializeApp({
	credential: admin.credential.cert("./server/firebase-service-account.json"),
	databaseURL: "https://quorum-722de.firebaseio.com"
});

var tokenDecoder = function (req, res, next) {
	console.log("ID TOKEN", req.headers.id_token);

	if (req.headers.id_token) {
		console.log('TOKEN DECODER');
		admin.auth().verifyIdToken(req.headers.id_token).then(function (decodedToken) {
				req.decodedToken = decodedToken;
				console.log('DECODED TOKEN:', decodedToken);
				userIdQuery(decodedToken.email, req, next);
			})
			.catch(function (error) {
				console.log('User token could not be verified');
				res.sendStatus(403);
			});
	} else {
		console.log('token decoder in decoder.js');
		res.sendStatus(403);
	}
};

function userIdQuery(userEmail, req, next) {
	return pool.connect().then(function (err, client, done) {
		if (err) {
			console.log('decoder.js connection error: ', err);
			res.sendStatus(500);
		}

		client.query('SELECT id FROM users WHERE email = $1', [userEmail],
			function (err, result) {
				done();

				if (err) {
					console.log('select query error: ', err);
					res.sendStatus(500);
				} else {
					console.log('Length of ROWS:', result.rows.length);
					var userId = result.rows[0].id; // this is the id that corresponds to users email in users table
					console.log('decoder.js USER ID DECODER:', userId);
					req.userId = userId;
					next();
				}
			});
	});
}

module.exports = {
	token: tokenDecoder
};
