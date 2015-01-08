// --------------  CONTROLLERS ------------------

var app = angular.module('app');

app.controller('SlideController', ['$scope', 'SlideService', function ($scope, SlideService) {
	
	$scope.Slide = SlideService;

	$scope.nextSlide = function () {
		$scope.Slide.slide ++;
	}

	$scope.prevSlide = function () {
		$scope.Slide.slide --;
	}	
}])

app.controller('SettingsController', ['$scope', '$location', 'HTTPService', 'ArticleService', 
	function ($scope, $location, HTTPService, ArticleService) {

}]);

app.controller('DatabaseController', ['$scope', '$location', 'HTTPService', 'ArticleService', 
	function ($scope, $location, HTTPService, ArticleService) {

	$scope.data = [{articles: ""}];
	$scope.objects = [{}];
	$scope.checked = 0;
	$scope.duplicatescheck = 0;

	$scope.Checkarticles = function (articles) {
		console.log(articles);
		console.log($scope.data.articles);
		$scope.duplicatescheck = 1; 
	};

	$scope.ClearForm = function (articles) {
		$scope.data = [{articles: ""}];
		$scope.checked = 0;
		$scope.duplicatescheck = 0;
	};


	$scope.CheckarticleStructure = function () {
		$scope.objects = JSON.parse($scope.data.articles);

		//read keynames
		var keyNames = Object.keys($scope.objects[0]);
		console.log(keyNames.length);
		if (keyNames.length > 4) {console.log("sobran columnas")};
		for (var i in keyNames) {
		     console.log(keyNames[i]);
		}
		
		$scope.checked = 1;
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

