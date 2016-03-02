var stylinkManage = angular.module('stylink-manage', [
  'ngRoute',
  'bw.paging',
  'stylinkManageDirectives',
  'stylinkManageFilters',
  'specialController'
]);

stylinkManage.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.
    when('/specials', {
      templateUrl: 'public/template/special/list.html',
      controller: 'specialCtrl'
    }).
    when('/specials/add', {
      templateUrl: 'public/template/special/add.html',
      controller: 'addSpecialCtrl'
    }).
    when('/specials/:id/modify', {
      templateUrl: 'public/template/special/modify.html',
      controller: 'modifySpecialCtrl'
    }).
    when('/pics', {
      templateUrl: 'public/template/pic/add.html'
    }).
    otherwise({
      redirectTo: '/specials'
    });
  }]);
