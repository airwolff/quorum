var router = require('express').Router();
var pg = require('pg');
var admin = require("firebase-admin");
var config = require('../config/dbconfig');

var pool = new pg.Pool(config.pg);


admin.initializeApp({
	credential: admin.credential.cert({
    "type": process.env.FIREBASE_SERVICE_ACCOUNT_TYPE,
    "project_id": process.env.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY,
    "client_email": process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_URI,
    "token_uri": process.env.FIREBASE_SERVICE_ACCOUNT_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL
  }),
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
