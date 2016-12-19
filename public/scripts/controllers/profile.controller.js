app.controller('ProfileController', ['$http', function ($http) {
	console.log('Profile up and running');

	var self = this;
	self.newArticle = {};
	self.articles = [];

	getProfileArticles();

	function getProfileArticles() {
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
				getProfileArticles();
			});
	};
	}]);
