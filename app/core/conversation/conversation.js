angular.module('myApp.conversation', ['myApp.message', 'myApp.inquiry'])

.component('conversation', {
    templateUrl: 'core/conversation/conversation.html',
    bindings: {
        'model': '=',
        'removeConversation': '&onRemove'
    },
    controller: ConversationCtrl
});

function Conversation(includeRandomMessage) {
    this.key = "";
    this.items = [];
    if (includeRandomMessage) {
        this.items.push(new RandomMessage());
    }
}

function ConversationCtrl() {
    this.$onInit = function() {
        this.model = this.model || new Conversation(true);
        this.character = {};
        this.character.name = this.model.key;
    }
    this.addMessage = function(text, id) {
        var m = new Message();
        m.text = defaultValue(text, m.text);
        m.id = defaultValue(id, m.id);
        this.model.items.push(m)
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