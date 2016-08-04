angular.module('myApp.export', ['myApp.conversation'])

    .component('exportButton', {
        template: '<button ng-click="$ctrl.print()">print model</button>' +
        '<button ng-click="$ctrl.printJSON()">print JSON</button>' +
        '<button ng-click="$ctrl.printTransformedJSON()">print transformed JSON</button>',
        controller: ['conversations', 'jsonTransformer', ExportController]
    })

    .component('modelDebug', {
        template: '<pre>{{ $ctrl.model | json }}</pre>',
        controller: ['conversations', ExportController]
    })

function ExportController(conversations, jsonTransformer) {
    this.$onInit = function () {
        this.model = conversations.all;
    }
    this.print = function () {
        console.log(this.model)
    }

    this.printJSON = function () {
        console.log(angular.toJson(this.model, 2));
    }

    this.printTransformedJSON = function () {
        var mapping = {"/\\$/": null};
        var obj = {conversations: this.model};
        console.log(jsonTransformer.transformObject(obj, mapping));
    }

    this.printXML = function () {
        // var cleanJSON = angular.fromJson(angular.toJson(this));
        var cleanJSON = prepareModelExport(this);
        var config = {
            keepOrder: true,
            orderContainerName: "keepOrder",
            arrayOrderItems: ["message", "inquiry"],
            useDoubleQuotes: true
        }
        console.log((new X2JS(config)).json2xml_str(cleanJSON));
    }
}