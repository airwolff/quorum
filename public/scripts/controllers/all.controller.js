app.controller("AllController", ["$http", function ($http) {
	console.log("all is running");

	var self = this;
	self.newArticle = {};
	self.articles = [];

	getArticles();

	// read only
	function getArticles() {
		$http.get("/getArticle")
			.then(function (response) {
				console.log(response.data);
				self.articles = response.data;
			});
	}
}]);
