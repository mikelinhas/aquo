// --------------  CONTROLLERS ------------------

var app = angular.module('app');

  app.controller('treeCtrl', ['$scope', 'BOMService', 'ArticleService', 'ResourceService', 'filterFilter', '$modal',
    function ($scope, BOMService, ArticleService, ResourceService, filterFilter, $modal) {
    
    $scope.ResourceStuff = ResourceService;
    $scope.ArticleStuff = ArticleService;
    $scope.BOMStuff = BOMService;
    $scope.selectedarticle = 0;
    $scope.data = [];


    $scope.selectarticle = function (Code) {
      var selectedarticle = filterFilter($scope.articles, Code);
      $scope.selectedarticle = selectedarticle[0];
      $scope.selectedarticle["Type"] = "primary";
      $scope.selectedarticle["BOM"] = [];
      pushtodata($scope.selectedarticle);
    };

    function pushtodata (article) {
      $scope.data.push(article);
    };

    $scope.remove = function(scope) {
      scope.remove();
    };

    $scope.toggle = function(scope) {
      scope.toggle();
    };

    $scope.collapseAll = function() {
      $scope.$broadcast('collapseAll');
    };

    $scope.expandAll = function() {
      $scope.$broadcast('expandAll');
    };

    $scope.newSubItem = function(scope) {
      var material = scope.$modelValue;
      material.BOM.push({
        Type: "material",
        Code: material.Code * 10 + material.BOM.length,
        Description: material.Description + '.' + (material.BOM.length + 1),
        BOM: []
      });
    };

    $scope.newMaterial = function(scope) {
      var item = scope.$modelValue;
      item.BOM.push({
        Code: "Material",
        Description: " - ",
        _id:"",
        Type: "material",
        BOM: []
      });
    };

    $scope.newResource = function(scope) {
      var item = scope.$modelValue;
      item.BOM.push({
        Code: "Resource",
        Description: " - ",
        _id: "",
        StartTime: "00:00",
        EndTime: "00:00",
        Type: "resource",
        BOM: []
      });
    };

    $scope.edit = function (data) {
      var item = data.$modelValue;

      if (item.Type == 'resource') {
        var url = 'modules/production/partialviews/editResource.html'
      } else if (item.Type == 'material') {
        var url = 'modules/production/partialviews/editMaterial.html'
      };

      var modalInstance = $modal.open({
        templateUrl: url,
        controller: 'ModalInstanceCtrl',
        resolve: {
          item: function () {
            return item;
          }
        }
      });

      modalInstance.result.then(function (res) {
        item.Code = res.Code;
        item.Description = res.Description;
        item._id = res._id;
        if (item.Type == 'resource') {
          item.StartTime = res.StartTime;
          item.EndTime = res.EndTime;
        };
      }, function () {
        console.log('Modal dismissed');
      });
    
    };

    $scope.$watch ('data', function () {
      BOMService.checkBOM ($scope.data);
    }, true);

  }]);


// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

  app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, item) {

    $scope.item = item;

    $scope.applychanges = function (data) {
      $scope.item = data;
    };

    $scope.ok = function () {
      $modalInstance.close($scope.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });


