app.controller("AllController", ["$http", "AuthFactory", function ($http, AuthFactory, $firebaseAuth) {
	console.log("all is running");


	var self = this;
	self.newArticle = {};
	self.articles = [];

	getAllArticles();
	// getFeeds();

	// read only
	function getAllArticles() {
		$http.get("/getAllArticles")
			.then(function (response) {
				console.log(response.data);
				self.articles = response.data;
			});
	}

		function getFeeds() {
		$http.get("/getFeed")
			.then(function (response) {
				console.log(response.data);
				self.allFeeds = response.data;
			});
	}

	self.getFeed = function () {
		console.log('click');
		$http.get('/getFeed')
			.then(function (response) {
				console.log('clicke get ', response.data);
				self.allFeeds = response.data;
			});
			getFeeds();
	};

}]);
