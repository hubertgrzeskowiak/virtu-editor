angular.module('myApp.conversation', ['myApp.message', 'myApp.inquiry', 'myApp.character'])

.component('conversation', {
    templateUrl: 'core/conversation/conversation.html',
    bindings: {
        'model': '=',
        'removeConversation': '&onRemove'
    },
    controller: ['characterFactory', ConversationCtrl]
});

function Conversation(includeRandomMessage) {
    this.key = "";
    this.items = [];
    if (includeRandomMessage) {
        this.items.push(new RandomMessage());
    }
}

function ConversationCtrl(characterFactory) {
    this.$onInit = function() {
        this.model = this.model || new Conversation(true);
        this.character = characterFactory.create();
        this.character.name = this.model.key;
    };
    this.addMessage = function(text, id) {
        var m = new Message();
        m.text = defaultValue(text, m.text);
        m.id = defaultValue(id, m.id);
        this.model.items.push(m);
    };
    this.addInquiry = function() {
        var inquiry = new Inquiry();
        var c1 = new Choice();
        c1.result = "start";
        c1.text = "choice one";
        var c2 = new Choice();
        c2.result = "start";
        c2.text = "choice two";
        inquiry.choices.push(c1);
        inquiry.choices.push(c2);
        this.model.items.push(inquiry);
    };
    this.removeMessage = function(message) {
        var i = this.model.items.indexOf(message);
        if (i >= 0) {
            this.model.items.splice(i, 1);
        }
    };
}