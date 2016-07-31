angular.module('myApp.inquiry', [])

    .component('inquiry', {
        templateUrl: 'core/inquiry/inquiry.html',
        controller: InquiryController
    })

function InquiryController() {
    this.$onInit = function() {
        this.isFocused = false;
    }
}