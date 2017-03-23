angular.module('myApp.conversation', ['myApp.message', 'myApp.inquiry', 'myApp.character', 'component'])

.component('conversation', {
    templateUrl: 'core/conversation/conversation.html',
    bindings: {
        'model': '=',
        'removeConversation': '&onRemove'
    },
    controller: ['characters', ConversationCtrl]
});

function Conversation(key, items) {
    this.key = defaultValue(key, "");
    this.items = defaultValue(items, []);
}

function ConversationCtrl(characters) {
    this.$onInit = function() {
        if (typeof this.model === 'undefined' || this.model === {}) {
            this.character = characters.add();
        } else {
            if (characters.exists(this.model.key)) {
                this.character = characters.get(this.model.key);
            } else {
                characters.add()
            }
        }
        this.model = this.model || new Conversation("new character", [new RandomMessage()]);
        this.character = characters.add();
        this.character.name = this.model.key;
    };
    this.addMessage = function(text, id) {
        var m = new Message();
        m.text = defaultValue(text, m.text);
        m.id = defaultValue(id, m.id);
        this.model.items.push(m);
    };
    this.addInquiry = function() {
        var c1 = new Choice();
        var c2 = new Choice();
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