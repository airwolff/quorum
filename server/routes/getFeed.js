var router = require('express').Router();
var pg = require('pg');
var request = require('request');
var parser = require('rss-parser');
// var cron = require('node-cron');
// var spide = require('rssspider');
var config = require('../config/dbconfig');

var pool = new pg.Pool({
	database: config.database
});

// var url;
// cron.schedule('* * * * *', function () {
router.get('/', function (req, res) {
	pool.connect()
		.then(function (client) {
			// make query
			client.query(
					'SELECT * FROM rss_url;')
				.then(function (result) {
					client.release();
					result.forEach(function (rss) {
						parser.parseURL(rss, function (err, parsed) {
							console.log('parsed.feed ', parsed.feed);
							parsed.feed.entries.forEach(function (entry) {
								console.log('entry ', entry);
								client.query(
									'INSERT INTO article (contentSnippet, guid, link, title, category) ' +
									'VALUES ($1, $2, $3, $4, $5)', [entry.contentSnippet, entry.guid, entry.link, entry.title, entry.category])
							});
						});
					});
				})
				.catch(function (err) {
					// error
					client.release();
					console.log('error on SELECT', err);
					res.sendStatus(500);
				});
		});
});
// });

// spide.fetchRss(url).then(function (data) {
// 	console.log(data); // rss  post list
// });

module.exports = router;