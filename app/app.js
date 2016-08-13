angular.module('myApp', [
    'ngRoute',
    'myApp.edit',
    'myApp.testrun',
    'myApp.export'
])

    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        // $locationProvider.html5Mode(true); // requires a base element in HTML
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({redirectTo: '/edit'});
    }])
