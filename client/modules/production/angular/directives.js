var app = angular.module("app");

app.directive("mzBadge", function () {
  return {
    restrict: "A",
    transclude: true,
    replace: true,
    scope:{
      errors: "@",
    },
    template: 
    '<span class=\"badge pull-right\"' + 
    '      ng-style=\"mystyle\">' +
    '    <div ng-transclude></div>' +
    '</span>',

    controller: function ($scope) {
      $scope.$watch ("errors", function () {
        if ($scope.errors == 0) { 
          $scope.mystyle = {'background-color': "green"};
        } else { 
          $scope.mystyle = {'background-color': "red"};
        };
      }, true);
    },

	  link: function (scope, element, attrs){
      scope.errors = attrs.errors;
  	}
	}
});