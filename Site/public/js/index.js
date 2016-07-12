var app = angular.module('mainApp', ['ui.bootstrap', 'ngRoute', 'angular.filter']).run(function($http, $rootScope) {

});

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'main.html',
		controller: 'mainContoller'
	})
	.when('/add', {
		templateUrl: 'add.html',
		controller: 'addController'
	})
	.when('/delete', {
		templateUrl: 'delete.html',
		controller: 'deleteController'
	})
	.when('/about', {
		templateUrl: 'about.html',
		controller: 'aboutController'
	})
	.otherwise({
		redirectTo: '/'
	});

});