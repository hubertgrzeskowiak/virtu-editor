angular.module('myApp.conversation', ['myApp.message', 'myApp.inquiry'])

.component('conversation', {
    templateUrl: 'core/conversation/conversation.html',
    bindings: {
        'key': '=',
        'removeConversation': '&'
    },
    controller: ConversationCtrl
});

function Message() {
    text = "text";
    id = "id";
}

function ConversationCtrl(conversations) {
    this.$onInit = function() {
        this.conversation = conversations.get(this.key);
        console.log(this.conversation);
        this.character = {};
        this.character.name = this.key;
    }
    this.addMessage = function() {
        this.conversation.items.push(new Message())
    }
    this.addInquiry = function() {
        console.log("adding inquiry");
    }
    this.removeMessage = function(message) {
        var i = this.conversation.items.indexOf(message);
        if (i >= 0) {
            this.conversation.items.splice(i, 1);
        }
    }
    this.removeConversation = function() {
        conversations.remove(this.key);
    }
}



// this.printJSON = function() {
//     console.log(angular.toJson(this, 2));
// }
// this.printXML = function() {
//     // var cleanJSON = angular.fromJson(angular.toJson(this));
//     var cleanJSON = prepareModelExport(this);
//     var config = {
//         keepOrder: true,
//         orderContainerName: "keepOrder",
//         arrayOrderItems: ["message", "inquiry"],
//         useDoubleQuotes: true
//     }
//     console.log((new X2JS(config)).json2xml_str(cleanJSON));
// }