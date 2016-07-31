angular.module('myApp.conversation', ['myApp.message', 'myApp.inquiry'])

.component('conversation', {
    templateUrl: 'core/conversation/conversation.html',
    bindings: {
        'model': '=',
        'removeConversation': '&onRemove'
    },
    controller: ConversationCtrl
});

function Message() {
    this.text = "";
    this.id = "";
}

function ConversationCtrl() {
    this.$onInit = function() {
        this.model = this.model || new Conversation();
        this.character = {};
        this.character.name = this.key;
    }
    this.addMessage = function() {
        this.model.items.push(new Message())
    }
    this.addInquiry = function() {
        console.log("adding inquiry");
    }
    this.removeMessage = function(message) {
        var i = this.model.items.indexOf(message);
        if (i >= 0) {
            this.model.items.splice(i, 1);
        }
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