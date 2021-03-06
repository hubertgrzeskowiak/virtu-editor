angular.module("myApp.edit", ["ngRoute", "ngAnimate", "navigationutil", "myApp.message", "myApp.conversation", "jutaz.ngSweetAlertAsPromised"])

    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/edit", {
            templateUrl: "edit/edit.html"
        });
    }])

    .controller("EditController", ["$rootScope", "SweetAlert", "conversations", EditController])

    .config(function (conversationsProvider) {
        var startingConversations = [
            new Conversation("Jen", [
                new Message("Hello and welcome", "start"),
                new Message("You can start editing this story by clicking any of these " +
                    "speech bubbles.")
            ]),
            new Conversation("Lola", [
                new Message("you can have multiple characters with an own dialogue for each"),
                new Message("using the big plus sign to the right you can also add new " +
                    "characters to your story!")
            ])
        ];
        conversationsProvider.setInitialData(startingConversations);
    });


function EditController($rootScope, SweetAlert, convService) {
    var $ctrl = this;
    this.$onInit = function () {
        this.conversations = convService.all;
    };

    this.addConversation = function (character_id) {
        var c = convService.add("new character");
        c.items.push(new RandomMessage());
        return c;
    };

    this.askRemoveConversation = function (conversation) {
        var cancelMessages = ["Gosh, no!", "Wait!", "Aaah misclick!", "Stay!", "Actually..."];
        var confirmMessages = ["Be gone!", "Farewell", "I said: DELETE!", "No mercy!", "See ya!"];
        var randomCancel = function () {
            return cancelMessages[Math.floor(Math.random() * cancelMessages.length)];
        };
        var randomConfirm = function () {
            return confirmMessages[Math.floor(Math.random() * confirmMessages.length)];
        };

        SweetAlert.swal({
            title: "<div class=\"conversation-header\">" +
                "<div class=\"conversation-image\"></div>" +
                "</div>" +
                "Are you sure?",
            text: "Removing the whole conversation is permanent!",
            showCancelButton: true,
            cancelButtonText: randomCancel(),
            confirmButtonText: randomConfirm(),
            reverseButtons: true,
            confirmButtonColor: "#D9534F"
        }).then(function () {
            $ctrl.removeConversation(conversation);
        }, function () {
            // aborted
        });
    };

    this.removeConversation = function (conversation) {
        convService.remove(conversation.key);
    };
};