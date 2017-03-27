angular.module("myApp.forwarding", [])

    .component("forwarding", {
        templateUrl: "core/forwarding/forwarding.html",
        bindings: {
            model: "=",
            onDelete: "&"
        },
        controller: ForwardingController
    });

function Forwarding(target) {
    this.type = "forwarding";
    this.target = defaultValue(target, "");
}

function ForwardingController() {
    this.$onInit = function() {
        this.isFocused = false;
        this.model = defaultValue(this.model, new Forwarding())
    };
}