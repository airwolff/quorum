app.controller("AllController", ["$http", "AuthFactory", "$firebaseAuth", function ($http, AuthFactory, $firebaseAuth) {
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



// "#0d47a1", "#1565c0", "#1976d2", "#1e88e5", "#2196f3", "#42a5f5", "#64b5f6", "#90caf9", "#bbdefb", "#e3f2fd", "#1b5e20", "#2e7d32", "#388e3c", "#43a047", "#4caf50", "#66bb6a", "#81c784", "#a5d6a7", "#c8e6c9", "#e8f5e9",
