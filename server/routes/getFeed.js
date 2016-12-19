var router = require('express').Router();
var pg = require('pg');
var feed = require('feedparser');
var request = require('request');
var cron = require('cron');
var config = require('../config/dbconfig');

var pool = new pg.Pool({
	database: config.database
});

var cronJob = cron.job("*/10 * * * * *", function (err, collection) {
if (err) {
	console.log('Error in GET: ', err);
} else {
	router.get('/', function (req, res) {
		pool.connect()
			.then(function (client) {
				client.query(
						'SELECT * FROM rss_url')
					.then(function (result) {
						console.log('result ', result);
						client.release();
						// res.send(result.rows);
						var req = request(result);
						var feedparser = new feed([]);

						req.on('error', function (error) {});
						req.on('response', function (res) {
							var stream = this;
							if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
							stream.pipe(feedparser);
						});
						feedparser.on('error', function (error) {});
						feedparser.on('readable', function () {
							var stream = this;
							var meta = this.meta;
							var item;
							while (item = stream.read()) {
								console.log(item, meta, stream);
							}
						});
					})
					.catch(function (err) {
						// error
						client.release();
						res.sendStatus(500);
					});
			});
	});
}
});
});

cronJob.start();

module.exports = router;
