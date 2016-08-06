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
        var c1 = new Choice("start", "choice one");
        var c2 = new Choice("start", "choice two");
        var inquiry = new Inquiry([c1, c2]);
        this.model.items.push(inquiry);
    };
    this.removeItem = function(item) {
        var i = this.model.items.indexOf(item);
        if (i >= 0) {
            this.model.items.splice(i, 1);
        }
    };
}