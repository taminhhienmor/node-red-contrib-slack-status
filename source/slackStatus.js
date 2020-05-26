var request = require('request');
module.exports = function (RED) {
    "use strict";

    function slackStatus(n) {
        RED.nodes.createNode(this, n);
        var node = this;

        var methodValue = n.method
        var childPathProperty = n.childpath || ""
        var propertyType = n.propertyType || "msg";
        var globalContext = this.context().global;
        var flowContext = this.context().flow;

        var slackCertificate = RED.nodes.getNode(n.slackCertificate);

        node.on("input", function (msg) {
            node.status({});

            // select method 
            switch (methodValue) {
                case "set":
                    methodValue = "PUT"
                    break;
                case "push":
                    methodValue = "POST"
                    break;
                case "update":
                    methodValue = "PATCH"
                    break;
                case "remove":
                    methodValue = "DELETE"
                    break;
                default:
                    methodValue = methodValue
                    break;
            }

            // select childPath
            var childPath = "";
            switch (propertyType) {
                case "str":
                    childPath = childPathProperty
                    break;
                case "msg":
                    childPath = msg[childPathProperty]
                    break;
                case "flow":
                    childPath = flowContext.get(childPathProperty)
                    break;
                case "global":
                    childPath = globalContext.get(childPathProperty)
                    break;
                default:
                    childPath = childPathProperty
                    break;
            }

            if (methodValue == "setPriority" || methodValue == "setWithPriority") {
                methodValue = "put"
            } else if (methodValue == "msg.method" || methodValue == "") {
                methodValue = msg.method
            };

            if (typeof msg.payload != 'number') {
                newObj = msg.payload
            }

            if (typeof newObj != 'object') {
                newObj = JSON.parse(newObj)
            };

        })
    }

    RED.nodes.registerType("slackStatus", slackStatus);
};