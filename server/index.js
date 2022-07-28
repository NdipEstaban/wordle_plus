const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require("cors");
const { finished: playDone } = require('stream');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000",
        methods:["GET", "POST"],
    }
});

var rooms = [
    {key:'?', players:[{}], finished:[{}]}
];

players = [];
pla = [];      //list of finished players

io.on("connection", (socket) => {
    console.log(`User connected:${socket.id}`);

    socket.on("send_player_data", (data) => {
        players.push(data);
        socket.broadcast.emit("recieve_players_data", players);
    });

    socket.on("notify_player_finished", (data) => {
        console.log('player Finished');
        pla.push(data);
        socket.broadcast.emit("list_finished_players", pla);
    });

});

server.listen(3001, () => {
    console.log("Server is running");
});