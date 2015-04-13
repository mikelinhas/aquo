var app = angular.module('app', ['ngRoute','ui.bootstrap', 'ngSanitize', 'ngCsv']);

// ------------- ROUTING -------------------------

app.config(function($routeProvider) {
  $routeProvider
  	.when('/', {
  		templateUrl: '/modules/inventory/stock/stock.html',
  		controller: 'StockController'
  	})
  	.when('/article/:article_id', {
  		templateUrl: '/modules/inventory/stock/stock_id.html',
      controller: ''
  	})
    .when('/graph', {
      templateUrl: '/modules/inventory/stock/stock_chart.html',
      controller: 'GraphController'
    })
    .otherwise({
      redirectTo: '/'
    });

});

// --------------  CONTROLLERS ------------------

app.controller('StockController', ['$scope', 'StockService', 'ArticleService', function ($scope, StockService, ArticleService) {
 	$scope.Stock = StockService;
 	$scope.Articles = ArticleService;

  $scope.dt_from = new Date("January 13, 1988 11:13:00");
  $scope.dt_until = new Date();




  $scope.search = function (query,dt_from,dt_until){
    if (query == null) {
      console.log("its empty");
      StockService.reloadstock();
    } else {
 		 StockService.search(query,dt_from,dt_until);
    };
 	}
}]);

app.controller('CSVController', ['$scope', 'ArticleService', function ($scope, ArticleService) {
	$scope.getdata = function (articles) {
		var headers = [{Code: 'Código', 
						        Description: 'Descripción', 
						        Category: 'Categoría', 
						        Subcategory: 'Subcategoría',
						        _id: '_id'}];
		var data = headers.concat(articles);
		return data;
	}
}]);

app.controller('GraphController', ['$scope', 'ArticleService', function ($scope, ArticleService) {
}]);

app.controller('DateController', function ($scope) {

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.$parent.dt_until = new Date();

  $scope.today = function() {
    $scope.$parent.dt_until = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.$parent.dt_from = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.maxDate = new Date();

  $scope.toggleopen_from = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    if ($scope.opened_until == true) {
      $scope.opened_until = false;
    };

    $scope.opened_from = !$scope.opened_from;
  };

  $scope.toggleopen_until = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    if ($scope.opened_from == true) {
      $scope.opened_from = false;
    };

    $scope.opened_until = !$scope.opened_until;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

});

// ------------- SERVICES ------------------

app.service('StockService', function ($rootScope, HTTPService) {
    $rootScope.stock = [];
    loadRemoteData();

    this.reloadstock = function () {
      loadRemoteData();
    }
    function loadRemoteData () {
        HTTPService.getStock().then( function (stock) {
            $rootScope.stock = stock;
        });
    };

    this.search = function (query,dt_from,dt_until) {
        HTTPService.queryStock(query,dt_from,dt_until).then( function (stock) {
           $rootScope.stock = stock;
        });
    };

});

app.service('ArticleService', function ($rootScope, $http, HTTPService, filterFilter) {

	// GET THE ARTICLES
	$rootScope.articles = [];
    loadRemoteData();

	function loadRemoteData () {
		HTTPService.getArticles().then( function (articles) {
	        $rootScope.articles = articles;
        });
	};

	this.reloadarticles = function () {
		HTTPService.getArticles().then( function (articles) {
	        $rootScope.articles = articles;
        });
	};

	this.lookforId = function (id) {
		var article = filterFilter($rootScope.articles, id);
		return article[0];
	};

	function deleteArticle (id) {
		HTTPService.getArticles().then( function (articles) {
	        return answer;
        });
	};

});

app.service('HTTPService', function ($http, $q) {

	return({getArticles: getArticles,
            getStock: getStock,
            queryStock: queryStock,
			getOneArticle: getOneArticle});

    function getArticles() {
        var request = $http({
            method: "get",
            url: "/rest/articles",
            params: {
                action: "get"
            }
        });
        return( request.then( handleSuccess, handleError ) );
    }

    function getStock() {
        var request = $http({
            method: "get",
            url: "/rest/stock",
            params: {
                action: "get"
            }
        });
        return( request.then( handleSuccess, handleError ) );
    }

    function queryStock (query,dt_from,dt_until) {
        var request = $http({
            method: "get",
            url: "/rest/stockquery",
            params: {
                action: "get",
                code: query,
                from: dt_from,
                until: dt_until
            }
        });
        return( request.then( handleSuccess, handleError ) );
    }

    function getOneArticle(id) {
        var request = $http({
            method: "get",
            url: "/rest/article_id",
            params: {
                action: "get",
                id: id
            },
        });
        return( request.then( handleSuccess, handleError ) );
    }

    function handleSuccess( response ) {

    	return( response.data );
    }

    function handleError( response ) {
         if (
             ! angular.isObject( response.data ) ||
             ! response.data.message
             ) {
             return( $q.reject( "An unknown error occurred." ) );
         }
         // Otherwise, use expected error message.
         return( $q.reject( response.data.message ) );
     }
});
