var app = angular.module("app");

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
    "        style=\"background-color: {{color}}; color: #dfe9ed; font-size: 16px; font-weight: bold; text-align: center\">" +
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
  		scope.showbody = 0;
      // element.bind("mouseenter", function (){
      //   console.log (scope);
      // })
  	}
	}
});
