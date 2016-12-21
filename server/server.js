var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var decoder = require('./modules/decoder');
// var getFeed = require('./routes/getFeed');
// var getProfileArticles = require('./routes/getProfileArticles')
var users = require('./routes/users.js');
var getAllArticles = require('./routes/getAllArticles');
var insertArticle = require('./routes/insertArticle');
var portDecision = process.env.PORT || 3000;

// middleware
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.resolve('./public/')));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

app.use('/getAllArticles', getAllArticles);

// decode the token
app.use(decoder.token);

// any route after this is 'protected'
//
//routing modules
app.use('/insertArticle', insertArticle);
// app.use('/igetProfileArticles', getProfileArticlesArticles);
app.use('/users', users);

app.listen(portDecision, function () {
	console.log('running on port', portDecision);
});
