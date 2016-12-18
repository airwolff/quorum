var router = require('express').Router();
var pg = require('pg');
var feed = require('feedparser');
var request = require('request');
var config = require('../config/dbconfig');

var pool = new pg.Pool({
	database: config.database
});

router.get('/', function (req, res) {
	pool.connect()
		.then(function (client) {
			client.query(
					'SELECT * FROM rss_url')
				.then(function (result) {
					client.release();
					// res.send(result.rows);
					var req = request(result);
					var feedparser = new feed([]);

					req.on('error', function (error) {
					  // handle any request errors
					});
					req.on('response', function (res) {
					  var stream = this;
					  if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
					  stream.pipe(feedparser);
					});
					feedparser.on('error', function(error) {
					});
					feedparser.on('readable', function() {
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

module.exports = router;
