const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require("cors");
const { finished: playDone } = require('stream');
const { type } = require('os');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000",
        methods:["GET", "POST"],
    }
});

var rooms = [
    {key:'key', players:[{}], finished:[{}]},
    {key:'?', players:[{}], finished:[{}]},
];

var currentRoomNum = 0;
players = [];
pla = [];      //list of finished players

io.on("connection", (socket) => {
    console.log(`User connected:${socket.id}`);

    socket.on("send_player_data", (data) => {
        let queryRooms = updatePlayersData(data.key, data.name, data.grid, rooms);
        rooms = queryRooms.rooms;
        playersRoom = queryRooms.playersRoom;
        io.to(data.key).emit('recieve_players_data',{playersData:playersRoom.players});
    });
    //TODO:fix multiplayer grid render

    socket.on("notify_player_finished", (data) => {
        let queryRooms = addFinishedPlayers(data.row, data.key,data.name, data.grid, data.timeInSeconds, rooms);
        rooms = queryRooms.updatedRooms;
        playersRoom = queryRooms.playersRoom;
        io.to(data.key).emit('list_finished_players', {playersRoom:playersRoom});
    });

    socket.on("create_room", (data) => {
        var key = sessionKeyGenerator(currentRoomNum);
        newRoom = {
            key:key,
            word:data.word,
            players:[{name:data.host, grid:[]}],
            finished:[],
        };

        rooms.push(newRoom);
        currentRoomNum ++;
        socket.join(key);

        io.to(socket.id).emit('session_key', {sessionKey:key});
    });

    socket.on("join_room", (data) => {
        var query = joinRoom(data.key,rooms,data.player);
        console.log(query);
        if(query.success == true){
            socket.join(data.key);
            rooms = query.newRooms;
            io.to(socket.id).emit('session_existent', {sessionKey:data.key, word:query.roomWord});
        }else{
            io.to(socket.id).emit('session_non_existent', {session:false});
        }
    });

    socket.on("update_word", (data) => {

    })
});


server.listen(3001, () => {
    console.log("Server is running");
});

//useful functions

function sessionKeyGenerator(n, length=3){
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    result = `w${n}${result}`;
    return result;
}

function joinRoom(key, rooms, newPlayer){
    //rooms[{key:, players:[],finished:[]}];
    let word;
    for(let i = 0;i < rooms.length;i++){
        if(rooms[i].key == key){
            word = rooms[i].word;
            rooms[i].players.push({name:newPlayer, grid:[]});
            return {newRooms:rooms, success:true, roomWord:word};
        }
    }
    return {newRooms:rooms, success:false};
}

function updatePlayersData(key, name, grid, rooms){
    let currentRoom;
    let newArr = new Array();
    rooms.forEach((i) => {
        newArr.push(i);
    });
    newArr.map((room) => {
        if(room.key == key){
            currentRoom = room;
            for(let i = 0; i < room.players.length;i++){
                if(room.players[i].name == name){
                    room.players[i].grid = grid;
                }
            }
            return room;
        }
        return room;
    });
    
    return {rooms:newArr, playersRoom:currentRoom};
}

function finishedPlayer(key, name, time, row, rooms = rooms){
    let currentRoom;
    rooms = rooms.map((room) => {
        if(room.key == key){
            currentRoom = key;
            room.finished.push({name:name, time:time, row:row});
        }
        return room;
    });
};

function addFinishedPlayers(row, key, playerName, grid, timeInSeconds, rooms){
    console.log(rooms);
    console.log(typeof(rooms));
    let currentRoom;
    let newArr = new Array();
    rooms.forEach((i) => {
        newArr.push(i);
    });

    newArr.map((room) => {
        if(room.key == key){
            room.finished.push({name:playerName, grid:grid, row:row, time:timeInSeconds});
            currentRoom = room;
        }
        return room;
    });

    return {updatedRooms:newArr, playersRoom:currentRoom};
}

