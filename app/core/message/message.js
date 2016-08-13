angular.module('myApp.message', ['textarea.autoheight'])

    .component('message', {
        templateUrl: 'core/message/message.html',
        controller: MessageCtrl,
        bindings: {
            model: "=",
            onDelete: "&"
        }
    })

function Message(text, id, isIncoming) {
    this.type = "message";
    this.text = defaultValue(text, "");
    this.id = defaultValue(id, "");
    this.isIncoming = defaultValue(isIncoming, true);
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
    return new Message(randomHello());
}

function MessageCtrl() {
    this.$onInit = function () {
        this.model = defaultValue(this.model, new Message());
        this.model.id = defaultValue(this.model.id, "");
        this.model.text = defaultValue(this.model.text, "");
        this.model.isIncoming = defaultValue(this.model.isIncoming, true);
        this.isFocused = false;
        this.toggleSide = function () {
            this.model.isIncoming = !this.model.isIncoming;
        }
    }
}