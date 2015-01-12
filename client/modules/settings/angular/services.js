 // --------------SERVICES ------------------

var app = angular.module('app');

app.service('DeleteService', function (HTTPService, $location) {

    this.DeleteArticles = function () {
        HTTPService.deleteAllArticles().then(function (status){
            if (status=200) {
                console.log("aricles deleteed!!!!");
            } else {
                console.log("musta been an error")
            }
        });
    };

});

app.service('ImportService', function (HTTPService, $location) {
    this.checked = 0;
    this.data = [{excelarticles: "", json: ""}];

    this.ClearForm = function () {
        this.data = [{excelarticles: "", json: ""}];
        this.checked = 0;
    };

    this.Convert = function () {
        if (this.data.excelarticles !== undefined) {

            this.checked = 1;

            //get headings
            var headings = this.data.excelarticles.split('\n')[0].split(/	/);
            if (headings.length !== 4) {
                this.checked = 0;
                console.log("hay " + headings.length + " y deberian haber 4");
            };

            //remove headings from string
            var articlestring = this.data.excelarticles.split('\n');
            articlestring.shift();

            //create JSON array
            this.data.json = "[";
            for (var i = 0; i < articlestring.length; i++) {
                var array = "{\"Code\":\"" + 
                                      articlestring[i].replace(/	/, "\",\"Description\":\"")
                                      .replace(/	/, "\",\"Category\":\"")
                                      .replace(/	/, "\",\"Subcategory\":\"") +  "\"}";
                if (i < articlestring.length-1) { array = array + ","};
                this.data.json = this.data.json + array ;
            };
            this.data.json  = this.data.json + "]";
            
            //convert it into an object
            this.data.json = JSON.parse(this.data.json);
        };
    };

    this.Addarticles = function () {
		var added = 0;
		for (var i = 1; i <= this.data.json.length - 1; i++) {
			var new_article = [];

			new_article.Code = this.data.json[i].Code;
			new_article.Description = this.data.json[i].Description;
			new_article.Category = this.data.json[i].Category;
			new_article.Subcategory = this.data.json[i].Subcategory;
			
			HTTPService.addArticle(new_article).then(function (status){
				if (status=200) {
					added ++;
				} else {
					console.log("musta been an error")
				}
			});
		};
    }

});

app.service('ArticleService', function ($rootScope, HTTPService) {

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
			getOneArticle: getOneArticle,
			addArticle: addArticle,
			deleteArticle: deleteArticle,
            deleteAllArticles: deleteAllArticles});

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

    function deleteAllArticles (id) {
        var request = $http({
            method: "delete",
            url: "/rest/articles/deleteall",
            params: {
                action: "delete"
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