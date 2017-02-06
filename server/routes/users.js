var router = require('express').Router();
var pg = require('pg');
var config = require('../config/dbconfig');

// var pool = new pg.Pool({
// 	database: config.database
// });

var pool = new pg.Pool(config.pg);

router.get('/', function (req, res) {
	var userEmail = req.decodedToken.email;
	var userExists;
	pool.connect().then (function (err, client, done) {
		if (err) {
			console.log('users.js connection error: ', err);
			res.sendStatus(500);
		} else {
			client.query('SELECT * FROM users WHERE email = $1', [userEmail],
				function (err, result) {
					done();
					if (err) {
						console.log('users.js select query error: ', err);
						res.sendStatus(500);
					}
					userExists = result.rows.length > 0;
					res.send(userExists);
				});
		}
	});
});

router.post('/', function (req, res) {
	console.log('POST SUCCESSFUL');
	var userEmail = req.decodedToken.email;
	pool.connect().then (function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}
		client.query(
			'INSERT INTO users (email) ' +
			'VALUES ($1)', [userEmail],
			function (err, result) {
				done();

				if (err) {
					console.log('users.js insert query error: ', err);
					res.sendStatus(500);
				} else {
					res.sendStatus(201);
				}
			});
	});
});

module.exports = router;
