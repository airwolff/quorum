app.controller('AdminController', ["$http", "AuthFactory", function ($http, AuthFactory, $firebaseAuth) {
	console.log('admin is running');

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

	self.logIn = function () {
		console.log('login button');
		AuthFactory.logIn();
	};

	self.logOut = function () {
		console.log('logout button');
		AuthFactory.logOut();
	};

	function getCurrentUser() {
		currentUser = AuthFactory.currentUser();
	}

	}]);
