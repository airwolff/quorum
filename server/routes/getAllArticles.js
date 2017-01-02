var router = require('express').Router();
var pg = require('pg');
var config = require('../config/dbconfig');

var pool = new pg.Pool({
	database: config.database
});

router.get('/', function (req, res) {
	pool.connect()
		.then(function (client) {
			// make query
			client.query(
					'SELECT * FROM article;')
				.then(function (result) {
					client.release();
					res.send(result.rows);
				})
				.catch(function (err) {
					// error
					client.release();
					console.log('error on SELECT', err);
					res.sendStatus(500);
				});
		});
});

module.exports = router;
