angular.module('myApp', [
    'ngRoute',
    'myApp.edit',
    'myApp.testrun'
])

    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        // $locationProvider.html5Mode(true); // requires a base element in HTML
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({redirectTo: '/edit'});
    }])

//     .component('import', {
//         'template': '<button ng-click="$ctrl.import()">import</button>',
//         'controller': ["$scope", ImportController]
//     });
//
// function ImportController($scope) {
//     this.$onInit = function () {
//
//     }
//
//     this.import = function () {
//         console.log("importing model into scope");
//         console.log($scope)
//     }
// }
