angular.module('directives', [])

  .directive('cyHead', [function(){
    return {
      restrict: 'E',
      templateURL: 'templates/headertemplate.html'
    }
  }]);