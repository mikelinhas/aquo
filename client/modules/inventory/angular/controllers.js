// --------------  CONTROLLERS ------------------

var app = angular.module('app');

app.controller('TabsController', ['$scope', '$location', function ($scope, $location) {
    $scope.tabs = [{n: '1', title: 'Dashboard', url: '#'},
    			   {n: '2', title: 'Visualizar Stock', url: '#/stock'}, 
    			   {n: '3', title: 'Actualizar Base de Datos', url: '#/articles'}];
    
    $scope.currentTab = '1';

    var id = $location.path().split("/")[1]||"Unknown";
    	if (id == 'Unknown') {$scope.currentTab = '1'} 
    	else if (id == 'articles') {$scope.currentTab = '3'}
    	else if (id == 'stock') {$scope.currentTab = '2'};

    $scope.onClickTab = function (tab) {

        $scope.currentTab = tab.n;
    }
    
    $scope.isActiveTab = function(n) {
        return n == $scope.currentTab;
    }
}])

app.controller('CSVController', ['$scope', 'ArticleService', function ($scope, ArticleService) {

}])

app.controller('DashboardController', ['$scope', '$location', function ($scope,$location) {


}]); 

app.controller('NewArticleController', ['$scope', '$location', 'HTTPService', 'ArticleService', 
	function ($scope, $location, HTTPService, ArticleService) {

	console.log("Hello new Article, how are you?");
	$scope.new_article = [];
	$scope.addarticle = function () {
		HTTPService.addArticle($scope.new_article).then(function (status){
			if (status=200) {
				ArticleService.reloadarticles();
				$location.path('/articles');
			} else {
				console.log("musta been an error")
			}
		});
	}

}]);

app.controller('ArticleViewController', [ '$scope', '$location', 'ArticleViewService', 
	function ($scope, $location, ArticleViewService) {

 	$scope.ArticleViewStuff = ArticleViewService;

    var id = $location.path().split("/")[2]||"Unknown";

    loadRemoteData(id);
    function loadRemoteData (id) {
 		ArticleViewService.loadRemoteData(id);
  	};

	// $scope.deleteArticle = function (id) {
	// 	ArticleViewService.deleteArticle(id).then(function (response){
	// 		if (response = 200) {
	// 			console.log(id + "was deleted from MongoDB");
	// 			ArticleService.reloadarticles();
	// 			$location.path('/articles');
	// 		} else {
	// 			console.log ("musta been an error")
	// 		}
	// 	})
	// }

 }]);

app.controller('CategoryController', ['$scope', 'CategoryService', 
	function ($scope, CategoryService) {

	$scope.categories = CategoryService.categories;
	$scope.limit = 5;

}]);


app.controller('ArticleListController', ['$scope', '$location', 'ArticleService',
	 function ($scope, $location, ArticleService) {

	/*  Nota: el ArticleService mete un $rootScope.articles 
			  porq no lo sabia hacer de otra manera      */

	$scope.ArticleStuff = ArticleService;

 	$scope.predicate = 'Code';
 	$scope.reverse = 0;

 	$scope.sort = function (predicate) {
 		$scope.predicate = predicate;
 		$scope.reverse = !$scope.reverse;
 	}

	$scope.selectArticle = function (article, $event) {
		var url = $location.absUrl()+'/' + article._id;
		if ($event.ctrlKey == 1) {
			window.open(url);
		} else {
			$location.path('/articles/'+ article._id);
		}; 
	};

}]);