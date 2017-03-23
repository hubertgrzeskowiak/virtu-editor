angular.module('myApp.character', [])

    .provider('characters', function () {
        var initialData = [];
        this.setInitialData = function (data) {
            initialData = data;
        }
        this.$get = function () {
            return new CharactersManager(initialData);
        }
    });

function CharactersManager(initialData) {
    this.all = defaultValue(initialData, {});
    this.exists = function (id) {
        return typeof this.all[id] !== 'undefined';
    }
    this.get = function(id) {
        return this.all[id];
    }
    this.add = function (name, id) {
        var c = new Character(name, id);
        if (typeof name !== 'string') {
            throw new TypeError("character name must be string");
        }
        if (typeof id !== 'string') {
            throw new TypeError("character id must be string");
        }
        // look up if the id is used already
        if (!this.exists(id)) {
            c.id = id;
        } else {
            // if it is, try again after appending a number
            for (var i = 2; i < 100; i++) {
                if (!this.exists(id + i)) {
                    c.id = id+ i;
                    break;
                }
            }
        }
        this.all.push(c)
        return c;
    }
    this.remove = function (id) {
        for (var i = 0; i < this.all.length; i++) {
            if (this.all[i].id === id) {
                this.all.splice(i, 1);
                break;
            }
        }
    }
}


function Character(name, id) {
    this.nameToId = function (name) {
        return name.toLowerCase().replace(/ /g, "-");
    };
    this.name = defaultValue(name, "new character");
    this.id = defaultValue(id, this.nameToId(this.name));

}