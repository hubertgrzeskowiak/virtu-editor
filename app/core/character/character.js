angular.module('myApp.character', [])

.service('characterFactory', function() {
    this.create = function () {
        return new Character();
    }
})

function Character() {
    this.name = "";
    this.id = "";
}