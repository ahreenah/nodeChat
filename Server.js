var WebSocketServer = require('ws')

var webSocketServer = new WebSocketServer.Server({port:8080})

var clients=[]

webSocketServer.on('connection',function(ws){
	let clientId = clients.length;
	clients[clientId]=ws;
    console.log('new connection')
	clients[clientId].send(JSON.stringify({
		type:'hello',
		id:clientId,
	}));
	for(let client in clients) {
		if(client!=clientId){
			clients[client].send(JSON.stringify({
		        type:'join',
		        id:clientId,
	        }));
		}
	}
	ws.on('message',function(message){
		console.log(message);
		let jsonObj={
					type:'message',
					...JSON.parse(message),
				}

		let jsm=JSON.stringify(jsonObj)
		console.log('message: '+jsm)
		console.log('json object:');
		console.log(jsonObj);
		for(let client in clients) {
			if(client!=clientId){
				console.log(clients.client);
				clients[client].send(jsm);
			}
		}
	});
})

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.sendFile('/home/medvosa/Документы/LearnNode/chat/index.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
