angular.module('myApp.edit', ['ngRoute', 'myApp.conversation', 'ngSweetAlert'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/edit', {
            templateUrl: 'edit/edit.html',
        });
    }])

    .controller('EditController', ['$rootScope', 'SweetAlert', EditController])


function EditController($rootScope, SweetAlert) {
    var $ctrl = this;
    this.$onInit = function () {
        $rootScope.model = this.model = defaultValue($rootScope.model, {});
        this.model.conversations = defaultValue(
            this.model.conversations, this.startingConversations);
        this.conversationTemplate = {messages: [{text: "hi there!"}]};
    }
    this.startingConversations = [
        {
            name: "Jen", messages: [
            {id: "start", text: "Hello and welcome"},
            {
                text: "You can start editing this story by clicking any of these " +
                "speech bubbles."
            }
        ]
        },
        {
            name: "Lola", messages: [
            {text: "you can have multiple characters with an own dialogue for each"},
            {
                text: "using the big plus sign to the right you can also add new " +
                "characters to your story"
            }
        ]
        }
    ];
    this.addConversation = function () {
        var helloMessages = ["Hi there, I'm using Virtù!", "What a nice day for writing",
            "Help! I am trapped in this computer!!!", "Your trial time has expired.\nBwahaha - gotcha! :-D",
            "ENTER: ...me. haha", "Hello, world!", "Time to give this story a spin!",
            "I will spice this story up!", "Give me a nice plot, will ya?"];
        var randomHello = function() {
            return helloMessages[Math.floor(Math.random() * helloMessages.length)];
        }
        this.model.conversations.push({messages: [{text: randomHello()}]});
    }
    this.askRemoveConversation = function (conversation) {
        var cancelMessages = ["Gosh, no!", "Wait!", "Aaah misclick!", "Stay!", "Actually..."];
        var confirmMessages = ["Be gone!", "Farewell", "I said: DELETE!", "No mercy!", "See ya!"];
        var randomCancel = function() {
            return cancelMessages[Math.floor(Math.random() * cancelMessages.length)];
        }
        var randomConfirm = function() {
            return confirmMessages[Math.floor(Math.random() * confirmMessages.length)];
        }

        SweetAlert.swal({
            html: true,
            title: "<div class='conversation-header'><div class='conversation-image'></div></div>Are you sure?",
            text: "Removing the whole conversation is permanent!",
            showCancelButton: true,
            cancelButtonText: randomCancel(),
            confirmButtonText: randomConfirm(),
            confirmButtonColor: "#D9534F",
            allowEscapeKey: true,
            allowOutsideClick: true
        }).then(function () {
            $ctrl.removeConversation(conversation);
        })
    }
    this.removeConversation = function (conversation) {
        var i = this.model.conversations.indexOf(conversation);
        if (i >= 0) {
            this.model.conversations.splice(i, 1);
        }
    }
}

