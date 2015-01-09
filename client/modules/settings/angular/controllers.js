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

	$scope.data = [{excelarticles: "", json: ""}];
	$scope.checked = 0;
	$scope.duplicatescheck = 0;

	$scope.Convert = function () {
		if ($scope.data.excelarticles !== undefined) {

			$scope.checked = 1;
			
			//get headings
			var headings = $scope.data.excelarticles.split('\n')[0].split(/	/);
			if (headings.length !== 4) {
				$scope.checked = 0;
				console.log("hay " + headings.length + " y deberian haber 4");
				//no se que hacer con este error asi que le añado un punto al final
				//cuando hay un espacio o algo en blanco en la tabla falla
			};

			//remove headings from string
			var articlestring = $scope.data.excelarticles.split('\n');
			articlestring.shift();

			//create JSON array
			$scope.data.json = "[";
			for (var i = 0; i < articlestring.length; i++) {
				var array = "{\"Code\":\"" + 
									  articlestring[i].replace(/	/, "\",\"Description\":\"")
									  .replace(/	/, "\",\"Category\":\"")
									  .replace(/	/, "\",\"Subcategory\":\"") +  "\"}";
				if (i < articlestring.length-1) { array = array + ","};
				$scope.data.json = $scope.data.json + array ;
			};
			$scope.data.json  = $scope.data.json + "]";
			
			//convert it into an object
			$scope.data.json = JSON.parse($scope.data.json);
			console.log($scope.data.json);
		};

	}

	$scope.Checkarticles = function (articles) {
		console.log(articles);
		console.log($scope.data.articles);
		$scope.duplicatescheck = 1; 
	};

	$scope.ClearForm = function (articles) {
		$scope.data = [{excelarticles: "", json: ""}];
		$scope.checked = 0;
		$scope.duplicatescheck = 0;
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

