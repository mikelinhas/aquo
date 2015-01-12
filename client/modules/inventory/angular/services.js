 // --------------SERVICES ------------------

var app = angular.module('app');

app.service('CategoryService', function() {

	this.categories = [{name:'Embalaje', symbol:'fa fa-archive', color:'#254A6B'},
					  {name:'Producto Quimico', symbol:'fa-flask', color:'#254A6B'},
					  {name:'Producto Intermedio', symbol:'fa-cogs', color:'#254A6B'},
					  {name:'Producto Final', symbol:'fa-shopping-cart', color:'#254A6B'},
					  {name:'Film', symbol:'fa-cab', color:'#254A6B'},
					  {name: 'Cliente', symbol: 'fa-user', color:'#254A6B'}];

});

app.service('StockService', function ($rootScope, HTTPService) {
    $rootScope.stock = [];
    loadRemoteData();

    function loadRemoteData () {
        HTTPService.getStock().then( function (stock) {
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

app.service('ArticleViewService', function ($rootScope, HTTPService) {


    // GET THE ARTICLES
    $rootScope.article = [];

    this.loadRemoteData = function (id) {
        HTTPService.getOneArticle(id).then( function (response) {
            $rootScope.article = response;
        });
    };

    // function deleteArticle (id) {
    //     HTTPService.deleteArticle(id).then( function (response) {
    //         return response;
    //     });
    // };

});

app.service('HTTPService', function ($http, $q) {

	return({getArticles: getArticles,
            getStock: getStock,
			getOneArticle: getOneArticle,
			addArticle: addArticle,
			deleteArticle: deleteArticle});

	function deleteArticle (id) {
		var request = $http({
			method: "delete",
			url: "/rest/articles/delete",
			params: {
				action: "delete"
			},
			data: {
				id: id
			},
		    headers: {"Content-Type": "application/json;charset=utf-8"}
		});
		return( request.then( handleDeleteSuccess, handleError ))
	}

    function handleDeleteSuccess( response ) {
    	return( response.status );
    }

    function addArticle( article ) {
        var request = $http({
            method: "post",
            url: "rest/articles/add",
            params: {
                action: "post"
            },
            data: {
                Code: article.Code,
                Description: article.Description,
                Category: article.Category,
                Subcategory: article.Subcategory
            }
        });
        return( request.then( handlePostSuccess, handleError ) );
    }

    function handlePostSuccess( response ) {
    	return( response.status );
    }

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