angular.module('myApp.export', ['myApp.conversation'])

    .component('exportButton', {
        template: '<button ng-click="$ctrl.print()">print model</button>' +
        '<button ng-click="$ctrl.printJSON()">print JSON</button>',
        controller: ['conversations', 'jsonTransformer', ExportController]
    })

    .component('modelDebug', {
        template: '' +
        '<pre>{{ $ctrl.json | json }}</pre>' +
        '<pre>{{ $ctrl.halfway | json }}</pre>' +
        '<pre>{{ $ctrl.xml }}</pre>',
        controller: ['conversations', 'jsonTransformer', ExportController]
    })

function ExportController(conversations, jsonTransformer) {
    this.$onInit = function () {
        this.model = conversations.all;
        this.json = {conversations: this.model}
        this.transform();
    }
    this.print = function () {
        console.log(this.model)
    }

    this.printJSON = function () {
        console.log(angular.toJson(this.model, 2));
    }

    this.transform = function () {
        var items = []
        angular.forEach(this.model, function (conv, index, obj) {
            angular.forEach(conv.items, function (value, key, obj) {
                if (value.type === "message") {
                    var msg = {
                        message: {
                            "__text": value.text,
                            "_from": conv.key,
                            "_id": value.id
                        }
                    }
                    items.push(msg);
                }
            })
        })

        this.halfway = {screenplay: {keepOrder: items}};
        this.halfway.screenplay.keepOrder.push({inquiry : {choice1: "choice 1 text", choice2: "choice 2 text"}});
        // var mapping = {"/\\$/": null};
        // var obj = {conversations: this.model};
        // this.model = jsonTransformer.transformObject(obj, mapping);
        this.xml = this.json2xml(this.halfway);
        this.xml = vkbeautify.xml(this.xml, 4);
    }

    this.json2xml = function (json) {
        var config = {
            keepOrder: true,
            orderContainerName: "keepOrder",
            // arrayOrderItems: ["message", "items", "forward"],
            useDoubleQuotes: true
        }
        return new X2JS(config).json2xml_str(json, 2);
    }
}