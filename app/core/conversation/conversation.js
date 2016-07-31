angular.module('myApp.conversation', ['myApp.message', 'myApp.inquiry'])

.component('conversation', {
    templateUrl: 'core/conversation/conversation.html',
    bindings: {
        'model': '=',
        'removeConversation': '&'
    },
    controller: ConversationCtrl
});

function ConversationCtrl() {
    this.$onInit = function() {
        this.model = defaultValue(this.model, {});
        this.model.name = defaultValue(this.model.name, "")
        this.model.messages = defaultValue(this.model.messages, []);
    }
    this.addMessage = function() {
        this.model.messages.push({});
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
    this.addInquiry = function() {
        console.log("adding inquiry");
    }
    this.removeMessage = function(message) {
        var i = this.model.messages.indexOf(message);
        if (i >= 0) {
            this.model.messages.splice(i, 1);
        }
    }
}