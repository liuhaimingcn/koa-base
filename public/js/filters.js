var stylinkManageFilters = angular.module('stylinkManageFilters', []);

stylinkManageFilters.filter('checkType', function () {
  return function (input) {
    switch (input) {
      case 0:
        return '专题';
        break;
      case 1:
        return '风格';
        break;
      default:
        return '未知';
        break;
    }
  };
});