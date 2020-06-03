var request = require('request');
module.exports = function (RED) {
    "use strict";

    function slackStatus(n) {
        RED.nodes.createNode(this, n);
        var node = this;

        var icon = n.icon
        var statusProperty = n.statusContent || ""
        var statusType = n.statusType || "msg";
        var globalContext = this.context().global;
        var flowContext = this.context().flow;

        var slackCertificate = RED.nodes.getNode(n.slackCertificate);

        const LINK_URL = "https://slack.com/api/users.profile.set"
        const STATUS_EXP = 0;
        const METHOD_POST = "POST"

        node.on("input", function (msg) {
            node.status({});

            // check token input
            if (typeof(slackCertificate.token) == "undefined") {
                node.error("Token is not empty", {});
                node.status({fill: "red", shape: "ring", text: "Token is not empty"});
                return;
            }

            // get status
            var status = "";
            switch (statusType) {
                case "str":
                    status = statusProperty
                    break;
                case "msg":
                    status = msg[statusProperty]
                    break;
                case "flow":
                    status = flowContext.get(statusProperty)
                    break;
                case "global":
                    status = globalContext.get(statusProperty)
                    break;
                default:
                    status = statusProperty
                    break;
            }

            // check msg icon
            if(icon == "msg.icon") icon = msg.icon

            // change status profile
            var profileObj = {
                "profile": {
                    "status_text": status,
                    "status_emoji": icon,
                    "status_expiration": STATUS_EXP
                }
            }          
            
            // add object request param
            var opts = {
                method: METHOD_POST,
                url: LINK_URL,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + slackCertificate.token
                },
                body: JSON.stringify(profileObj)
            };

            request(opts, function (error, response, body) {
                if (error) {
                    node.error(error, {});
                    node.status({fill: "red", shape: "ring", text: "failed"});
                    return;
                } else {
                    if(!JSON.parse(body).ok) {
                        node.error(JSON.parse(body).error, {});
                        node.status({fill: "red", shape: "ring", text: "failed"});
                        return;
                    } else {
                        msg.payload =  "Change status successfully";
                        node.send(msg);
                    }
                }    
            })
        })
    }

    RED.nodes.registerType("slackStatus", slackStatus);
};