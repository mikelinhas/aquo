var app = angular.module('app', ['ngRoute','ui.bootstrap']);

 // -------------- ROUTING ------------------

	app.config(function($routeProvider) {
	  $routeProvider
	  	.when('/articles', {
	  		templateUrl: '/modules/inventory/partialviews/articlelist.html',
	  		controller: 'ArticleListController'
	  	})
	  	.when('/articles-:filter', {
	  		templateUrl: '/modules/inventory/partialviews/articlelist.html',
	  		controller: 'ArticleListController'
	  	})
	  	.when('/articles/newarticle', {
	  		templateUrl: '/modules/inventory/partialviews/newarticle.html',
	  		controller: 'NewArticleController'
	  	})
	  	.when('/articles/:articleCode', {
	  		templateUrl: '/modules/inventory/partialviews/articleview.html',
	  		controller: 'ArticleViewController'
	  	})
	  	.when('/categories', {
	  		templateUrl: '/modules/inventory/partialviews/categorylist.html',
	  		controller: 'CategoryController'
	  	})
	    .otherwise({
	      redirectTo: '/articles'
	    });

	});

