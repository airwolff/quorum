var router = require('express').Router();
var pg = require('pg');
var request = require('request');
var spide = require('rssspider');
// var htmlText = require('html-to-text');
//var cron = require('cron');
var config = require('../config/dbconfig');

var pool = new pg.Pool({
	database: config.database
});

//var cronJob = cron.job("* * * * * *", function () {

	router.get('/', function (req, res) {
		pool.connect()
			.then(function (client) {
				// make query
				client.query(
						'SELECT * FROM rss_url;')
					.then(function (result) {
						client.release();
						result.rows.forEach(function (item, index) {
							spide.fetchRss(item.url).then(function (data) {
								console.log(data);

								data.forEach(function (item, index) {
									client.query(
										'INSERT INTO article (guid, link, title, category, summary) ' +
										'VALUES ($1, $2, $3, $4, $5)', [item.guid, item.link, item.title, item.category, item.summary],
										function (err) {
											if (err) {
												res.sendStatus(500);
											} else {
												console.log("added to the database: ", item);
											}
										});
								}) .then(res.sendStatus(200));
							});
						});
					});
			});
	});
//});


// htmlToText.data.summary(path.join(__dirname, 'test.html'), {
//     tables: ['#invoice', '.address']
// }, (err, text) => {
//     if (err) return console.error(err);
//     console.log(text);
// });

//cronJob.start();

module.exports = router;