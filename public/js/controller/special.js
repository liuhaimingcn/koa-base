"use strict";

var specialController = angular.module('specialController', [
  'specialService'
]);

specialController.controller('specialCtrl', ['$scope', 'specials', 'special', function ($scope, specials, special) {
  $scope.currentPage = 1;
  $scope.pageSize = 10;
  $scope.total = 0;

  $scope.DoCtrlPagingAct = function (page) {
    specials.getSpecials({page: page, perPage: $scope.pageSize}, function (data) {
      $scope.specials = data.list;
      $scope.total = data.sum;
    });
  };
  $scope.DoCtrlPagingAct($scope.currentPage);

  $scope.deleteSpecial = function (id) {
    special.modifySpecial({id: id}, {status: 0}, function (data) {
      if (data.id === id) {
        alert('删除成功！');
        $scope.DoCtrlPagingAct($scope.currentPage);
      } else {
        alert('删除失败！');
      }
    });
  }
}]);

specialController.controller('addSpecialCtrl', ['$scope', '$location', 'specials', function ($scope, $location, specials) {
  $scope.special = {};
  $scope.processForm = function () {
    specials.addSpecial($scope.special, function (data) {
      if (data.id) {
        alert('添加成功！');
        $location.path('/specials');
      } else {
        alert('添加失败！');
      }
    });
  };
}]);

specialController.controller('modifySpecialCtrl', ['$scope', '$routeParams', '$location', 'special', function ($scope, $routeParams, $location, special) {
  special.getSpecial({id: $routeParams.id}, function (data) {
    $scope.special = data;
  });
  $scope.processForm = function () {
    special.modifySpecial({id: $routeParams.id}, $scope.special, function (data) {
      if (data.id === $routeParams.id) {
        alert('修改成功！');
        $location.path('/speciales');
      } else {
        alert('修改失败！');
      }
    });
  };
}]);