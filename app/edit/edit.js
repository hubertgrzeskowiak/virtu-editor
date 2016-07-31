angular.module('myApp.edit', ['ngRoute', 'myApp.conversation', 'ngSweetAlert'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/edit', {
            templateUrl: 'edit/edit.html',
        });
    }])

    .controller('EditController', EditController)

    .service('conversations', function () {
        // Conversations should have a defined order, so using id as key is not suitable.
        this.all = [];
        this.get = function (id) {
            for (var i = 0; i < this.all.length; i++) {
                if (this.all[i].character_id === id) {
                    return this.all[i];
                }
            }
            return undefined;
        }
        this.exists = function (id) {
            return typeof this.get(id) !== 'undefined';
        }
        this.add = function (id) {
            var c = new Conversation();
            if (typeof id !== 'string') {
                throw new TypeError("conversation id must be string");
                return;
            }
            // look up if the id is used already
            if (!this.exists(id)) {
                c.character_id = id;
            } else {
                // if it is, try again after appending a number
                for (var i = 2; i < 100; i++) {
                    if (!this.exists(id + i)) {
                        c.character_id = id + i;
                        break;
                    }
                }
            }
            this.all.push(c)
            return c;
        }
        this.remove = function (id) {
            for (var i = 0; i < this.all.length; i++) {
                if (this.all[i].character_id === id) {
                    this.all.splice(i, 1);
                    break;
                }
            }
        }
    })


var helloMessages = ["Hi there, I'm using Virtù!", "What a nice day for writing",
    "Help! I am trapped in this computer!!!",
    "Your trial time has expired.\nBwahaha - gotcha! :-D",
    "ENTER: ...me. haha", "Hello, world!", "Time to give this story a spin!",
    "I will spice this story up!", "Give me a nice plot, will ya?"];

var randomHello = function () {
    return helloMessages[Math.floor(Math.random() * helloMessages.length)];
}

function RandomMessage() {
    this.text = randomHello();
}

function Conversation() {
    this.character_id = "";
    this.items = [new RandomMessage()];
}

function Character() {
    this.name = "";
    this.id = "";
}

function EditController($rootScope, SweetAlert, conversations) {
    var $ctrl = this;
    this.$onInit = function () {
        this.conversations = conversations.all;
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
    this.addConversation = function (character_id) {


        // this.model.conversations.push({messages: [{text: randomHello()}]});
        return conversations.add("anon");
    }
    this.askRemoveConversation = function (conversation) {
        var cancelMessages = ["Gosh, no!", "Wait!", "Aaah misclick!", "Stay!", "Actually..."];
        var confirmMessages = ["Be gone!", "Farewell", "I said: DELETE!", "No mercy!", "See ya!"];
        var randomCancel = function () {
            return cancelMessages[Math.floor(Math.random() * cancelMessages.length)];
        }
        var randomConfirm = function () {
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
        var i = this.conversations.indexOf(conversation);
        if (i >= 0) {
            this.conversations.splice(i, 1);
        }
    }
}

