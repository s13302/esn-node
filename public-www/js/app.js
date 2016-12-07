angular.module('voter', ['ngRoute', 'ngResource']);

angular.module('voter').config(function($routeProvider) {
	$routeProvider
		.when('/login', {
			templateUrl: 'common/login.html',
			controller: 'loginCtrl'
		})
		.when('/admin/dashboard', {
			templateUrl: 'admin/dashboard.html'
		})
		.when('/user/dashboard', {
			templateUrl: 'user/dashboard.html'
		})
		.otherwise('/login');
});