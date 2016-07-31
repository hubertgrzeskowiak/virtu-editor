angular.module('myApp.message', ['util.autoGrow'])

    .component('message', {
        templateUrl: 'core/message/message.html',
        controller: MessageCtrl,
        bindings: {
            model: "=",
            onDelete: "&"
        }
    })

function MessageCtrl() {
    this.$onInit = function () {
        this.model = defaultValue(this.model, {});
        this.model.id = defaultValue(this.model.id, "");
        this.model.text = defaultValue(this.model.text, "");
        this.isFocused = false;
        this.isIncoming = true;
        this.isOutgoing = !this.isIncoming;
        this.toggleSide = function () {
            this.isIncoming = !this.isIncoming;
            this.isOutgoing = !this.isIncoming;
        }
    }
}