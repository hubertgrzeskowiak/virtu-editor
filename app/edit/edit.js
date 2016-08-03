angular.module('myApp.edit', ['ngRoute', 'myApp.conversation', 'ngSweetAlert'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/edit', {
            templateUrl: 'edit/edit.html',
        });
    }])

    .controller('EditController', EditController)

    .config(function (conversationsProvider) {
        var startingConversations = [

            {
                key: "Jen", items: [
                {
                    type: "message",
                    id: "start",
                    text: "Hello and welcome"
                },
                {
                    type: "message",
                    text: "You can start editing this story by clicking any of these " +
                    "speech bubbles."
                }
            ]
            },
            {
                key: "Lola", items: [
                {
                    type: "message",
                    text: "you can have multiple characters with an own dialogue for each"
                },
                {
                    type: "message",
                    text: "using the big plus sign to the right you can also add new " +
                    "characters to your story!"
                }
            ]
            }
        ];
        conversationsProvider.setInitialData(startingConversations);
    })


function Character() {
    this.name = "";
    this.id = "";
}

function EditController($rootScope, SweetAlert, conversations) {
    var $ctrl = this;
    this.$onInit = function () {
        // TODO: name clash!!!
        this.conversations = conversations.all;
    }

    this.addConversation = function (character_id) {
        return conversations.add("new character");
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
            title: "<div class='conversation-header'>" +
            "<div class='conversation-image'></div>" +
            "</div>" +
            "Are you sure?",
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
        conversations.remove(conversation.key);
    }
}