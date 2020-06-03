## Introduction
<p>With this node, you can change status in <a href="https://app.slack.com/">Slack</a>.</p>

## Features
Change status

## Certificate


## Usage

![slag-node](https://cdn.jsdelivr.net/gh/taminhhienmor/node-red-contrib-slack-status/source/image/node_slack.PNG)

![slag-node-result](https://cdn.jsdelivr.net/gh/taminhhienmor/node-red-contrib-slack-status/source/image/node_slack_status.PNG)

``` node
[{"id":"98ac7b32.233a28","type":"slackStatus","z":"c7c652c3.cc73c","slackCertificate":"355e1241.0432de","statusContent":"hello","statusType":"str","icon":"😀","x":530,"y":800,"wires":[["ece1b118.30a71"]]},{"id":"f8433e01.0e5a2","type":"inject","z":"c7c652c3.cc73c","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":300,"y":800,"wires":[["98ac7b32.233a28"]]},{"id":"ece1b118.30a71","type":"debug","z":"c7c652c3.cc73c","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":770,"y":800,"wires":[]},{"id":"355e1241.0432de","type":"slackCertificate","z":""}]
```