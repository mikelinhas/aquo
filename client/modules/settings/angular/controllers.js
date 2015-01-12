// --------------  CONTROLLERS ------------------

var app = angular.module('app');

app.controller('SlideController', ['$scope', 'SlideService', function ($scope, SlideService) {
	
	$scope.Slide = SlideService;  // este está en directives

	$scope.nextSlide = function () {
		$scope.Slide.slide ++;
	}

	$scope.prevSlide = function () {
		$scope.Slide.slide --;
	}	
}])

app.controller('ImportController', ['$scope', '$location', 'HTTPService', 'ImportService', function ($scope,$location, HTTPService, ImportService) {
    $scope.Import = ImportService;

    $scope.ClearForm = function () {
    	ImportService.ClearForm();
    };

	$scope.Convert = function () {
		ImportService.Convert();
	};

	$scope.Addarticles = function () {
		ImportService.Addarticles();
	};


   
}]);

app.controller('SettingsController', ['$scope', '$location', function ($scope, $location){

}]);

app.controller('DeleteController', ['$scope', '$location', 'DeleteService', function ($scope, $location, DeleteService) {
    $scope.deleteArticles = function () {
        DeleteService.DeleteArticles ();
    }
}]);

app.controller('DatabaseController', ['$scope', '$location', 'HTTPService', 'ArticleService', 
	function ($scope, $location, HTTPService, ArticleService) {

    $scope.redirect = function (url) {
        $location.path(url);
    };

}]);

app.controller('TabsController', ['$scope', '$location', function ($scope, $location) {
    $scope.tabs = [{n: '1', title: 'Database', url: '#/database'},
    			   {n: '2', title: 'Usuario', url: '#/user'}, 
    			   {n: '3', title: 'Otros', url: '#/other'},
    			   {n: '4', title: 'Ideas', url: '#/ideas'}];
    
    $scope.currentTab = '1';

    var id = $location.path().split("/")[1]||"Unknown";
    	if (id == 'Unknown') {$scope.currentTab = '1'} 
    	else if (id == 'users') {$scope.currentTab = '3'}
    	else if (id == 'other') {$scope.currentTab = '2'};

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.n;
    }
    
    $scope.isActiveTab = function(n) {
        return n == $scope.currentTab;
    }
}])

