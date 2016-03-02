var specialService = angular.module('specialService', ['ngResource']);

specialService.factory('specials', ['$resource', function ($resource) {
  return $resource('/api/specials', null, {
    getSpecials: {method: 'GET', params: {page: 'page', perPage: 'perPage'}},
    addSpecial: {method: 'POST'}
  });
}]);

specialService.factory('special', ['$resource', function ($resource) {
  return $resource('/api/specials/:id', {id: 'id'}, {
    modifySpecial: {method: 'PUT'},
    getSpecial: {method: 'GET'}
  });
}]);



