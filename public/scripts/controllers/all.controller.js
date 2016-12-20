app.controller("AllController", ["$http", "AuthFactory", function ($http, AuthFactory, $firebaseAuth) {
	console.log("all is running");

	var currentUser;
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

	self.logIn = function () {
		console.log('this is login');
		AuthFactory.logIn();
	};

	self.logOut = function () {
		console.log('this is logout');
		AuthFactory.logOut();
	}

	function getCurrentUser() {
		currentUser = AuthFactory.currentUser();
	}

}]);
