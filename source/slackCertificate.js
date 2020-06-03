module.exports = function (RED) {
	"use strict";
	function slackCertificate(n) {
		RED.nodes.createNode(this, n);
		this.token = this.credentials.token;
	}
	
	RED.nodes.registerType("slackCertificate", slackCertificate, {
		credentials: {
			token: { type: 'password' }
		}
	});
};