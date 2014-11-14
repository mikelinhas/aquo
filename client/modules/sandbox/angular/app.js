var app = angular.module('app', ['ngRoute','ui.bootstrap', 'ngAnimate']);

 // -------------- ROUTING ------------------

	app.config(function($routeProvider) {
	  $routeProvider
	  	.when('/articles', {
	  		templateUrl: '/modules/sandbox/partialviews/articlelist.html',
	  		controller: 'ArticleListController'
	  	})
	  	.when('/articles/newarticle', {
	  		templateUrl: '/modules/sandbox/partialviews/newarticle.html',
	  		controller: 'NewArticleController'
	  	})
	  	.when('/articles/:articleCode', {
	  		templateUrl: '/modules/sandbox/partialviews/articleview.html',
	  		controller: 'ArticleViewController'
	  	})
	    .otherwise({
	      redirectTo: '/articles'
	    });

	});

