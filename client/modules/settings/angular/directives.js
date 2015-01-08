var app = angular.module("app");

app.directive("mzslide", function () {
  return {
    restrict: "E",
    scope:{
      number: "@",
    },
    transclude: true,
    template: 
    "<div class=\"container col-xs-11 col-sm-5\" ng-show=\"Slide.slide == number\">" +
    " <div ng-transclude></div> " +
    "</div>",
    controller: function ($scope, SlideService) {
      $scope.Slide = SlideService;
      $scope.$watch('Slide.slide', function () {
      })
    },
    link: function (scope, element, attrs){
        scope.number = attrs.number;
      }
    }
});
//This service goes together with MZSlide
app.service('SlideService', function(){
    this.slide = 1;
})


app.directive("mzpanel", function () {
  return {
    restrict: "E",
    transclude: true,
    replace: true,
    scope:{
      title: "@",
      color: "@",
      active: "@"
    },
    template: 
    "<div class=\"panel panel-default\" style=\"border\" ng-hide=\"active\">" +
    "	<div class=\"panel-heading\" ng-click=\"showbody = !showbody\" " +
    "        style=\"background-color: {{color}}; color: lightgrey\">" +
    "		{{title}} " + 
    "	</div>" +
    "	<div class=\"fade-hide panel-body\" ng-show=\"showbody\">" +
    "		<div ng-transclude></div>" + 
    "	</div>" +
   	"</div>",


	  link: function (scope, element, attrs){
  		scope.title = attrs.title;
  		scope.color = attrs.color;
      scope.active = attrs.active;
      if (scope.active == undefined) {scope.active = 1};
  		scope.showbody = 1;
      // element.bind("mouseenter", function (){
      //   console.log (scope);
      // })
  	}
	}
});


/* mzbutton is a simple button binded to an active or inactive state.
   This directive's scope is bounded with '=' meaning that when we toggle 
   active on the element, we are also toggling active in our controller scope
   outside this directive... sweet
*/ 
app.directive("mzButton", function () {
  return {
    restric: "A",
    transclude: true,
    scope: {
      active: "=",
      color: "@",
      size:"@"
    },
    template: 
    "<div class=\"col-xs-{{xs}} col-sm-{{sm}} btn btn-default\" ng-click=\"toggle()\"" +
    "     ng-style=\"mystyle\">" +
    " <div ng-transclude></div>" + 
    "</div>",

    controller: function ($scope, $attrs) {
      $scope.toggle = function () {
        $scope.active = !$scope.active;
        if ($scope.active == false) { 
          $scope.mystyle = {'background-color': "white", 'color': 'lightgrey'};
        };
        if ($scope.active == true) { 
          $scope.mystyle = {'background-color': $attrs.color, 'color': 'lightgrey'};
        };
      }
    },
    
    link: function (scope, element, attrs){
      scope.title = attrs.title;
      scope.active = attrs.active;
      scope.mystyle = {'background-color': attrs.color, 'color': 'lightgrey'};
      scope.xs = attrs.xsSize;
      scope.sm = attrs.smSize;
    }
  }
});