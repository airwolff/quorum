var router = require('express').Router();
var pg = require('pg');
var config = require('../config/dbconfig');

var pool = new pg.Pool(config.pg);

router.get('/', function (req, res) {
	console.log('insert route');
	var favorites;
	var userId = req.userId;
	console.log('userId ', userId);
	pool.connect()
		.then(function (client) {
			// make query
			console.log("newArticle", newArticle);
			client.query(
					'SELECT FROM users (title, link, description, category, guid) ' +
					'VALUES ($1, $2, $3, $4, $5)', [newArticle.title, newArticle.link, newArticle.description, newArticle.category, newArticle.guid])
				.then(function (result) {
					client.release();
					res.sendStatus(201);
				})
				.catch(function (err) {
					// error
					client.release();
					console.log('error on INSERT', err);
					res.sendStatus(500);
				});
		});
});

// router.get('/', function (req, res) {
// 	pool.connect()
// 		.then(function (client) {
// 			// make query
// 			client.query(
// 					'SELECT * FROM article;')
// 				.then(function (result) {
// 					client.release();
// 					res.send(result.rows);
// 				})
// 				.catch(function (err) {
// 					// error
// 					client.release();
// 					console.log('error on SELECT', err);
// 					res.sendStatus(500);
// 				});
// 		});
// });

module.exports = router;
