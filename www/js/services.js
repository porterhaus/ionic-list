angular.module('starter')

.factory('BgtestService', ['$http', function ($http) {
  var service = {};

  service.getBgtests = function() {
    return $http.get('http://api.glucoded-dev.com:3000/bgtests', { headers: {'Authorization':'b876d3e60d7645b629c84c76a4aee438'}});
  }

  service.getBgtest = function(id) {
    return $http.get('http://api.glucoded-dev.com:3000/bgtests/' + id, { headers: {'Authorization':'b876d3e60d7645b629c84c76a4aee438'}});
  }

  return service;
}])

.factory('BgtestFactory', function($resource, $http) {
  $http.defaults.headers.common['Authorization'] = 'b876d3e60d7645b629c84c76a4aee438';
  return $resource('http://api.glucode-dev.com:3000/bgtests/:id', { id: '@_id' },
  {
    'index': {
      method:'GET',
      isArray: false
    },
    'show': {
      method: 'GET',
      isArray: false
    },
    'create': {
      method: 'POST',
      isArray: false
    },
    'update': {
      method: 'PUT',
      params: {
        id: '@id'
      }
    },
    'destroy': {
      method: 'DELETE',
      params: {
        id: '@id'
      },
      actions: {
        url: 'http://api.glucode-dev.com:3000/bgtests/:id'
      }
    }
  });
});
