angular.module('myApp.conversation')

    .service('conversations2', ConversationsManager)
    .provider('conversations', function() {
        var initialData = [];

        this.setInitialData = function(data) {
            initialData = data;
        }

        this.$get = function() {
            return new ConversationsManager(initialData);
        }
    })

function ConversationsManager(initialData) {
    // Conversations should have a defined order, so using id as key is not suitable.
    // Instead we're saving the id as property value.
    this.all = defaultValue(initialData, []);
    this.get = function (key) {
        for (var i = 0; i < this.all.length; i++) {
            if (this.all[i].key === key) {
                return this.all[i];
            }
        }
        return undefined;
    }
    this.exists = function (key) {
        return typeof this.get(key) !== 'undefined';
    }
    this.add = function (key) {
        var c = new Conversation();
        if (typeof key !== 'string') {
            throw new TypeError("conversation key must be string");
            return;
        }
        // look up if the id is used already
        if (!this.exists(key)) {
            c.key = key;
        } else {
            // if it is, try again after appending a number
            for (var i = 2; i < 100; i++) {
                if (!this.exists(key + i)) {
                    c.key = key + i;
                    break;
                }
            }
        }
        this.all.push(c)
        return c;
    }
    this.remove = function (key) {
        for (var i = 0; i < this.all.length; i++) {
            if (this.all[i].key === key) {
                this.all.splice(i, 1);
                break;
            }
        }
    }
}
