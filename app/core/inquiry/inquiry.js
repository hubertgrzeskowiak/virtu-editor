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

function Inquiry(target, choices) {
    this.target = defaultValue(target, "");
    this.choices = defaultValue(choices, []);
}

function Choice(result, text) {
    this.result = defaultValue(result, "");
    this.text = defaultValue(text, "");
}