// --------------  CONTROLLERS ------------------

var app = angular.module('app');

app.controller('NewArticleController', ['$scope', '$location', 'HTTPService', 'ArticleService', function ($scope, $location, HTTPService, ArticleService) {

	console.log("Hello new Article, how are you?");

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

app.controller('ArticleViewController', [ '$scope', '$location', 'ArticleService', 'HTTPService', function ($scope, $location, ArticleService, HTTPService) {

 	$scope.ArticleStuff = ArticleService;

    var id = $location.path().split("/")[2]||"Unknown";
    viewArticle (id);

    function viewArticle (id) {
 		$scope.article = ArticleService.lookforId(id);
    }

	$scope.$watch ('articles', function () {
		viewArticle(id);
	});

	$scope.deleteArticle = function (id) {
		HTTPService.deleteArticle(id).then(function (status){
			if (status = 200) {
				console.log(id + "was deleted from MongoDB");
				ArticleService.reloadarticles();
				$location.path('/articles');
			} else {
				console.log ("musta been an error")
			}
		})
	}

 }]);

app.controller('CategoryController', ['$scope', 'CategoryService', function ($scope, CategoryService) {

	$scope.CategoryStuff = CategoryService;

}]);


app.controller('ArticleListController', [
	'$scope', '$location', 'ArticleService', 'CategoryService', 'PaginationService',
	 function ($scope, $location, ArticleService, CategoryService, PaginationService) {

	/*  Nota: el ArticleService mete un $rootScope.articles 
			  porq no lo sabia hacer de otra manera      */

	$scope.CategoryStuff = CategoryService;
	$scope.ArticleStuff = ArticleService;
	$scope.PaginationStuff = PaginationService;

    var filter = $location.path().split("/")[1].split("-")[1]||0;	
	$scope.selectedcategory = CategoryService.select(filter);

	$scope.$watch ('articles', function () {
		queryArticles();
	});

	$scope.$watch ('query', function () {
		queryArticles();
	})

	$scope.pgdown = function () {
		if ($scope.PaginationStuff.selectedpage > 1 ) {
			PaginationService.select($scope.PaginationStuff.selectedpage-1);
		}
	}

	$scope.pgup = function () {
		if ($scope.PaginationStuff.selectedpage < $scope.PaginationStuff.numberofpages){
			PaginationService.select($scope.PaginationStuff.selectedpage+1);
		}
	}

	$scope.paginateArticle = function (index) {
		top_limit = $scope.PaginationStuff.selectedpage*20-1;
		bottom_limit = $scope.PaginationStuff.selectedpage*20-21;
		if (index >= bottom_limit && index <= top_limit) {
			return true;
		} else {
		return false;
		}
	}

	function queryArticles () {
		PaginationService.select(1);
		ArticleService.query($scope.query,$scope.CategoryStuff.selectedcategory);
	}

	$scope.selectArticle = function (article) {
		$location.path('/articles/'+ article._id);
	};

	$scope.selectCategory = function (category) {
		CategoryService.select(category);
		PaginationService.select(1);
	};

}]);

app.controller('PaginationController', ['$scope', 'PaginationService', 'ArticleService', function ($scope, PaginationService, ArticleService){

	$scope.PaginationStuff = PaginationService;
	$scope.ArticleStuff = ArticleService;

	$scope.$watch('ArticleStuff.filteredarticles', function () {
		$scope.pages = PaginationService.recountpages();
	});

	$scope.selectPage = function (pagenumber) {
		$scope.selectedpage = PaginationService.select(pagenumber);
	};


}]);