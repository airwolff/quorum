var router = require('express').Router();
var pg = require('pg');
var config = require('../config/dbconfig');

var pool = new pg.Pool(config.pg);

router.post('/', function (req, res) {
	var newArticle = req.body;
	pool.connect()
		.then(function (client) {
			// make query
			console.log("newArticle", newArticle);
			client.query(
					'INSERT INTO article (contentSnippet, guid, link, title, category) ' +
					'VALUES ($1, $2, $3, $4, $5)', [newArticle.contentSnippet, newArticle.guid, newArticle.link, newArticle.title, newArticle.category])
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
