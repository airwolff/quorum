var router = require('express').Router();
var pg = require('pg');
var admin = require("firebase-admin");
var config = require('../config/dbconfig');

var pool = new pg.Pool({
	database: config.database
});


admin.initializeApp({
	credential: admin.credential.cert("./server/firebase-service-account.json"),
	databaseURL: "https://quorum-722de.firebaseio.com"
});


var tokenDecoder = function (req, res, next) {
	//console.log("ID TOKEN",req.headers.id_token);

	if (req.headers.id_token) {
		console.log('TOKEN DECODER');
		admin.auth().verifyIdToken(req.headers.id_token).then(function (decodedToken) {
				// Adding the decodedToken to the request so that downstream processes can use it
				req.decodedToken = decodedToken;

				console.log('DECODED TOKEN:', decodedToken);

				userIdQuery(decodedToken.email, req, next);
			})
			.catch(function (error) {
				// If the id_token isn't right, you end up in this callback function
				// Here we are returning a forbidden error
				console.log('User token could not be verified');
				res.send(403);
			});

	} else {
		console.log('HERE');
		res.sendStatus(403);
	}
};

function userIdQuery(userEmail, req, next) {
	return pool.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		client.query('SELECT id FROM users WHERE email = $1', [userEmail],
			function (err, result) {
				done(); // close the connection.

				if (err) {
					console.log('select query error: ', err);
					res.sendStatus(500);
				} else {
					console.log('Length of ROWS:', result.rows.length);
					var userId = result.rows[0].id; // this is the id that corresponds to users email in users table
					console.log('USER ID DECODER:', userId);
					req.userId = userId;
					next();
				}
			});
	});
}

module.exports = {
	token: tokenDecoder
};
