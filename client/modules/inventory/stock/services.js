 // --------------SERVICES ------------------

app.service('StockService', function ($rootScope, HTTPService) {
    $rootScope.stock = [];
    loadRemoteData();

    function loadRemoteData () {
        HTTPService.getStock().then( function (stock) {
            $rootScope.stock = stock;
        });
    };

    this.search = function (query) {
        HTTPService.queryStock(query).then( function (stock) {
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

    function queryStock (query) {
        var request = $http({
            method: "get",
            url: "/rest/stockquery",
            params: {
                action: "get",
                code: query
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