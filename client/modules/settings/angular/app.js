var app = angular.module('app', ['ngRoute','ui.bootstrap']);

 // -------------- ROUTING ------------------

	app.config(function($routeProvider) {
	  $routeProvider
	  	.when('/database', {
	  		templateUrl: '/modules/settings/partialviews/database.html',
	  		controller: 'DatabaseController'
	  	})
	  	.when('/user', {
	  		templateUrl: '/modules/settings/partialviews/user.html',
	  		controller: 'SettingsController'
	  	})
	  	.when('/other', {
	  		templateUrl: '/modules/settings/partialviews/other.html',
	  		controller: 'SettingsController'
	  	})
	  	.when('/ideas', {
	  		templateUrl: '/modules/settings/partialviews/ideas.html',
	  		controller: 'SettingsController'
	  	})
	    .otherwise({
	      redirectTo: '/database'
	    });

	});

