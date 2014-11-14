 // --------------SERVICES ------------------

var app = angular.module('app');

app.service('PaginationService', function (filterFilter, $rootScope, ArticleService){

	this.ArticleStuff = ArticleService;
	this.selectedpage = 1;

	this.recountpages = function () {
		this.numberofpages = Math.floor(this.ArticleStuff.filteredarticles.length/20+1);
		pages = [];
		for (i = 0; i < this.numberofpages; i++) {
			pages.push(i+1);
		}
		this.pages = pages;		
		return this.pages;
	}

	this.select = function (pagenumber) {
		this.selectedpage = pagenumber;
		return this.selectedpage;
	}

});

app.service('CategoryService', function(/*note that a service can include another service*/) {

	this.categories = [{name:'Embalaje', symbol:'fa fa-archive'},
					  {name:'Producto Quimico', symbol:'fa-flask'},
					  {name:'Producto Intermedio', symbol:'fa-cogs'},
					  {name:'Producto Final', symbol:'fa-shopping-cart'},
					  {name:'Film', symbol:'fa-cab'},
					  {name: 'Cliente', symbol: 'fa-user'}];


	this.selectedcategory = 0;

	this.select = function (category) {
		this.selectedcategory = category;
		return this.selectedcategory;
	}

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

	this.query = function (query, selectedcategory) {
		this.filteredarticles = filterFilter($rootScope.articles, selectedcategory);
		this.filteredarticles = filterFilter(this.filteredarticles, query);
	};

	this.lookforId = function (id) {
		var article = filterFilter($rootScope.articles, id);
		return article[0];
	};

	this.push = function (articlesJSON) {
		
		var articles = JSON.parse(articlesJSON);


		for (i = 0; i< articles.length; i++) {

			var new_article = {Code:articles[i].CODIGO,Description:articles[i].PRODUCTO,Category:articles[i].CATEGORIA,Subcategory:articles[i].SUBCATEGORIA};
			$http.post('/rest/articles/add', new_article)
				.success(function (res) {
					console.log('Express mgs: ' + res);
				})
				.error(function(res) {
					console.log('musta been an error');
					// console.log('Express msg: ' + res.body);
			});
			console.log (new_article);
		};
	};

	function deleteArticle (id) {
		HTTPService.getArticles().then( function (articles) {
	        return answer;
        });
	};

});

app.service('HTTPService', function ($http, $q) {

	return({getArticles: getArticles,
			//getOneArticle: getOneArticle,
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

    function getOneArticles() {
        var request = $http({
            method: "get",
            url: "/rest/articles",
            params: {
                action: "get"
            }
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