angular.module('myApp.export', ['myApp.conversation', 'bootstrap-angular'])

    .component('modelDebug', {
        templateUrl: 'export/modeldebug.html',
        controller: ['conversations', 'jsonTransformer', '$scope', Exporter]
    })

function Exporter(conversations, jsonTransformer, $scope) {
    var $ctrl = this;
    this.$onInit = function () {
        this.model = conversations.all;
        this.json = {screenplay: this.model}
        $scope.$watch(
            function (scope) {
                return $ctrl.model;
            },
            function () {
                $ctrl.intermediate = $ctrl.prepareScreenplayForTransformation($ctrl.model);
                $ctrl.xml = $ctrl.json2xml($ctrl.intermediate);
            }, true)
    }
    this.print = function () {
        console.log(this.model)
    }

    this.printJSON = function () {
        console.log(angular.toJson(this.model, 2));
    }

    this.prepareMessageForTransformation = function (key, item) {
        var msg = {
            message: {
                "__text": item.text
            }
        }
        if (item.isIncoming) {
            msg.message._from = key;
            msg.message._to = "you";
        } else {
            msg.message._from = "you";
            msg.message._to = key;
        }
        if (typeof item.id === 'string' && item.id.length > 0) {
            msg.message._id = item.id;
        }
        return msg;
    }

    this.prepareInquiryForTransformation = function (key, item) {
        var choices = [];
        angular.forEach(item.choices, function (value, index, obj) {
            choices.push({
                choice: {
                    "_result": value.result,
                    "__text": value.text
                }
            })
        })
        var inquiry = {
            inquiry: {
                "_target": key,
                keepOrder: choices
            }
        }
        return inquiry;
    }

    this.prepareConversationItemForTransformation = function (key, item) {
        if (item.type === "message") {
            return this.prepareMessageForTransformation(key, item);
        } else if (item.type === "inquiry") {
            return this.prepareInquiryForTransformation(key, item);
        } else {
            console.log("how do we export " + item.type + "?");
        }
    }

    this.prepareConversationForTransformation = function (conv) {
        var convItems = [];
        angular.forEach(conv.items, function (value, key, obj) {
            var item = $ctrl.prepareConversationItemForTransformation(conv.key, value);
            if (item != null) {
                convItems.push(item);
            }
        });
        var end = {"end":""};
        convItems.push(end);
        return convItems;
    }

    this.prepareScreenplayForTransformation = function (screenplay) {
        var screenplayItems = [];
        angular.forEach(screenplay, function (conv, index, obj) {
            var convItems = $ctrl.prepareConversationForTransformation(conv);
            screenplayItems = screenplayItems.concat(convItems);
        })
        var halfway = {screenplay: {keepOrder: screenplayItems}};
        return halfway;

    }

    this.json2xml = function (json) {
        var config = {
            keepOrder: true,
            orderContainerName: "keepOrder",
            useDoubleQuotes: true
        }
        var xml = new X2JS(config).json2xml_str(json);
        return vkbeautify.xml(xml, 2);
    }
}