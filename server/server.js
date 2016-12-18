var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var getArticle = require('./routes/getArticle');
var insertArticle = require('./routes/insertArticle');
var portDecision = process.env.PORT || 3000;

// middleware
app.use(bodyParser.urlencoded({
	extended: true
}));
// app.use(bodyParser.json());

//routing modules
app.use('/getArticle', getArticle);
app.use('/insertArticle', insertArticle);

app.get('/', function (req, res) {
	res.sendFile(path.resolve('./public/views/index.html'));
});

app.use(express.static('public'));

app.listen(portDecision, function () {
	console.log('running on port', portDecision);
});
