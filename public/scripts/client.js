var app = angular.module('app', ['ngRoute', 'firebase', 'ui.materialize', 'ngSanitize']);
app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/admin', {
			templateUrl: '/views/templates/admin.html',
			controller: 'AdminController',
			controllerAs: 'admin',
		})
		.when('/all', {
			templateUrl: '/views/templates/all.html',
			controller: 'AllController',
			controllerAs: 'all',
		})
		.when('/lecture', {
			templateUrl: '/views/templates/lecture.html',
			controller: 'LectureController',
			controllerAs: 'lecture',
		})
		.when('/post', {
			templateUrl: '/views/templates/post.html',
			controller: 'PostController',
			controllerAs: 'post',
		})
		.when('/pre', {
			templateUrl: '/views/templates/pre.html',
			controller: 'PreController',
			controllerAs: 'pre',
		})
		.when('/profile', {
			templateUrl: '/views/templates/profile.html',
			controller: 'ProfileController',
			controllerAs: 'profile',
		})
		.when('/project', {
			templateUrl: '/views/templates/project.html',
			controller: 'ProjectController',
			controllerAs: 'project',
		})
		.otherwise({
			redirectTo: 'all'
		});
}, ]);


app.filter()