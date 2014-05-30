var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 5445});

wss.broadcast = function(data) {
  for (var i in this.clients)
    this.clients[i].send(data);
};

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log(JSON.parse(message));
        wss.broadcast(message);

    });
});

var express = require('express');
var app = express();
app.get('/', function(req, res){
  res.sendfile('index.html');

});
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
