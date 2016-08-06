angular.module('myApp.inquiry', [])

    .component('inquiry', {
        templateUrl: 'core/inquiry/inquiry.html',
        bindings: {
            model: "="
        },
        controller: InquiryController
    })

function InquiryController() {
    this.$onInit = function() {
        this.isFocused = false;
        this.model = defaultValue(this.model, new Inquiry())
    }
}

function Inquiry(choices) {
    this.type = "inquiry";
    this.choices = defaultValue(choices, []);
}

function Choice(result, text) {
    this.result = defaultValue(result, "");
    this.text = defaultValue(text, "");
}