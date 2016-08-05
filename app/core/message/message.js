angular.module('myApp.message', ['util.autoGrow'])

    .component('message', {
        templateUrl: 'core/message/message.html',
        controller: MessageCtrl,
        bindings: {
            model: "=",
            onDelete: "&"
        }
    })

function Message() {
    this.text = "";
    this.id = "";
}

function RandomMessage() {
    var helloMessages = ["Hi there, I'm using Virtù!", "What a nice day for writing",
        "Help! I am trapped in this computer!!!",
        "Your trial time has expired.\nBwahaha - gotcha! :-D",
        "ENTER: ...me. haha", "Hello, world!", "Time to give this story a spin!",
        "I will spice this story up!", "Give me a nice plot, will ya?"];

    var randomHello = function () {
        return helloMessages[Math.floor(Math.random() * helloMessages.length)];
    }
    this.text = randomHello();
    this.id = "";
}

function MessageCtrl() {
    this.$onInit = function () {
        this.model = defaultValue(this.model, new Message());
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