app.controller('AdminController', ['$http', function ($http) {
	console.log('admin is running');
	var myApp = angular.module("myApp", []);

	var self = this;
	self.newArticle = {};
	self.articles = [];

	getArticles();

	function getArticles() {
		$http.get('/getArticle')
			.then(function (response) {
				console.log(response.data);
				self.articles = response.data;
			});
	}

	self.addArticle = function () {
		console.log('new article: ', self.newArticle);
		$http.post('/insertArticle', self.newArticle)
			.then(function (response) {
				console.log('POST finished. Get articles again.');
				getArticles();
			});
	};
	}]);
