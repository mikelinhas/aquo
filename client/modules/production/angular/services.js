 // --------------SERVICES ------------------

app.service('ResourceService', function ($rootScope, $http, HTTPService){
  $rootScope.resources = [];
  loadResourceData();

  function loadResourceData () {
    HTTPService.getResources().then( function (resources) {
          $rootScope.resources = resources;
        });
  };
});

app.service('BOMService', function (HTTPService) {
  
  this.errors = [{name:"00", amount: 0, description:"Err. 00: Empty BOM"},
                 {name:"101", amount: 0, description:"Err. 101: Only primary (blue) allowed on first layer"},
                 {name:"306", amount: 0, description:"Err. 306: Resource not definded correctly"},
                 {name:"99", amount: 0, description:"Err. 99: Repeated item on BOM layer"},
                 {name:"57", amount: 0, description: "Err. 57: only resources the resource BOM"},
                 {name:"007", amount: 0, description: "Err. 007: EndTime must be after StartTime"},
                 {name:"Total", amount: 0, description: "Total amount of errors"}];

  function restartErrors (errors) {
    for (var i = errors.length - 1; i >= 0; i--) {
      errors[i].amount = 0;
    };
  };

  this.checkBOM = function (data) {
    restartErrors(this.errors);
    //check first Layer
    if (data.length == 0) {
      this.errors[0].amount ++;
      this.errors[6].amount ++;
    };

    for (var i = data.length - 1; i >= 0; i--) {
      if (data[i].Type == "primary") {
        if (data[i].BOM.length == 0 ) {
          this.errors[0].amount ++;
          this.errors[6].amount ++;
        };
        checkNextLayer(data[i].BOM, "primary", this.errors);
      } else {
        this.errors[1].amount ++;
        this.errors[6].amount ++;
        if (data[i]._id == "") {
          this.errors[2].amount ++;
          this.errors[6].amount ++;
        };
      };
    };
  };

  function checkNextLayer(BOM, Type, errors) {
    for (var i = BOM.length - 1; i >= 0; i--) {
      checkNextLayer(BOM[i].BOM, BOM[i].Type, errors);

      if (BOM[i]._id == "") {
        errors[2].amount ++;
        errors[6].amount ++;
      } else {
        checkIfRepeated(BOM, BOM[i]._id, i, errors);
      };
      
      if (Type == "resource") {
        if (BOM[i].Type !== "resource") {
          errors[4].amount ++;
          errors[6].amount ++;
        };
      };
        
      if (BOM[i]._id !== "" && BOM[i].Type == "resource") {
        if (typeof BOM[i].StartTime == 'undefined') {
          errors[2].amount ++;
          errors[6].amount ++;
        } else if (typeof BOM[i].EndTime == 'undefined') {
          errors[2].amount ++;
          errors[6].amount ++;
        } else if (BOM[i].StartTime >= BOM[i].EndTime) {
          errors[5].amount ++;
          errors[6].amount ++;
        };
      };  

    };
  };

  function checkIfRepeated(BOM, id, j, errors) {
    for (var i = BOM.length - 1; i >= 0; i--) {
      if (i !== j) {
        if (BOM[i]._id == id) {
          errors[3].amount + 0.5;
          errors[6].amount ++;
        };
      } 
    };
  };

});

app.service('ArticleService', function ($rootScope, $http, HTTPService) {


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
          getResources: getResources,
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

    function getResources() {
        var request = $http({
            method: "get",
            url: "/rest/resources",
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
