// Made Tuesday, March 26th, 2024
// Backend for the roulette
const express = require("express");
const partials = require('express-partials');
const fs = require("fs");
const { Server } = require("socket.io");
const bodyParser = require('body-parser');

// HTTP
const http = require('http');
const app = express();
const port = 3000;
// Server
const server = http.createServer(app); // Web 
const io = new Server(server); // Socket

app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);
app.use('/', express.static(__dirname+'/views/pages'));
app.set('socketio', io);
app.use(partials())
// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Render Home
app.get('/', (req, res) => {
    res.render("pages/main")
});

// Dict of all the connect players
var players = {}

// Socket IO
io.on("connection", (socket) => {
    console.log("User Connected")
    players[socket.id] = {"ready": false, "money": }
    // Sends all clients the "spinWheel" command
    socket.on("spin", function(data) {
        io.emit("spinWheel", data)
    })

    socket.on
})
// Starts the server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});