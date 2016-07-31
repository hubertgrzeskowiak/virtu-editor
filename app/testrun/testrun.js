'use strict';

angular.module('myApp.testrun', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/test', {
    templateUrl: 'testrun/testrun.html',
    controller: 'TestrunController'
  });
}])

.controller('TestrunController', [function() {

}]);