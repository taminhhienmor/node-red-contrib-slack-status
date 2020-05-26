module.exports = function (RED) {
  "use strict";
  function slackCertificate(n) {
    RED.nodes.createNode(this, n);
    var node = this;

    this.secret = this.credentials.secret;
    this.email = this.credentials.email;

  }
  RED.nodes.registerType("slackCertificate", slackCertificate, {
    credentials: {
      secret: { type: 'password' },
      email: { type: 'text' }
    }
  });
};