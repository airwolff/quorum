var router = require('express').Router();
var pg = require('pg');
var request = require('request');
var parser = require('rss-parser');
// var cron = require('node-cron');
var config = require('../config/dbconfig');

var pool = new pg.Pool({
	database: config.database
});

var parsedArticle = {};
var arrayParsedArticles = [];

// var url;
// cron.schedule('* * * * *', function () {


// function insertArticles()


router.get('/', function (req, res) {
pool.connect()
	.then(function (client) {
			// make query
			client.query(
					'SELECT * FROM rss_url;')
				.then(function (result) {
						client.release();
						result.rows.forEach(function (item, index) {
	parser.parseURL(item.url, function (err, parsed) {
		parsed.feed.entries.forEach(function (entry) {
			console.log(entry.title + ':' + entry.link);
			parsedArticle = {};
			parsedArticle.contentSnippet = entry.contentSnippet,
				parsedArticle.guid = entry.guid,
				parsedArticle.link = entry.link,
				parsedArticle.title = entry.title,
				parsedArticle.category = [entry.category];
				console.log(parsedArticle);
			arrayParsedArticles.push(parsedArticle);
			console.log(arrayParsedArticles);
			// return arrayParsedArticles;
		})
	})
						})

							client.query(
								'INSERT INTO article (contentSnippet, guid, link, title, category) ' +
								'VALUES ($1, $2, $3, $4, $5)', [parsedArticle.contentSnippet, parsedArticle.guid, parsedArticle.link, parsedArticle.title, parsedArticle.category])

						});
				});
	})
// .catch(function (err) {
// // error
// client.release();
// console.log('error on SELECT', err);
// res.sendStatus(500);
// });
// });
// });
// });


module.exports = router;