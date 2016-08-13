angular.module('navigationutil', [])

.controller('NavigationUtilCtrl', ['$location', NavigationUtilCtrl])

function NavigationUtilCtrl($location) {
    this.isActive = function (path) {
        return $location.path().substr(0, path.length) === path;
    }
}