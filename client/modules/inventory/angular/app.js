var app = angular.module('app', ['ngRoute','ui.bootstrap', 'ngSanitize', 'ngCsv']);

 // -------------- ROUTING ------------------

	app.config(function($routeProvider) {
	  $routeProvider
	  	.when('/', {
	  		templateUrl: '/modules/inventory/partialviews/dashboard.html',
	  		controller: 'DashboardController'
	  	})
	  	.when('/stock', {
	  		templateUrl: '/modules/inventory/partialviews/stock.html',
	  		controller: 'StockController'
	  	})
	  	.when('/articles', {
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
	    .otherwise({
	      redirectTo: '/'
	    });

	});

