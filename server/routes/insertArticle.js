var router = require('express').Router();
var pg = require('pg');
var config = require('../config/dbconfig');

var pool = new pg.Pool({
  database: config.database
});

router.post('/', function(req, res) {
  console.log('adding an article');
  var newArticle = req.body;
  // store in DB
  pool.connect()
    .then(function(client) {
      // make query
      client.query(
        'INSERT INTO article (title, link, description, category, guid) ' +
        'VALUES ($1, $2, $3, $4, $5)',
        [newArticle.title, newArticle.link, newArticle.description, newArticle.category, newArticle.guid])
        .then(function(result) {
          client.release();
          res.sendStatus(201);
        })
        .catch(function(err) {
          // error
          client.release();
          console.log('error on INSERT', err);
          res.sendStatus(500);
        });
    });
});

module.exports = router;
