import React, { useEffect, useState } from 'react';
import Wordle from './pages/Playground';
import './style/Playground.css';
import './style/Home.css';
import Home from './pages/Home';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

function App(){
  const sendPlayerData = () => {
    socket.emit("player_data", {data:"hello"});
  };

  const checkFinished = (tile,player) => {
    if(tile >= 30){
      socket.emit("player_finished", {player:""});
    }
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      alert(data.message);
    });
  }, [socket]);

  return(
    <div>
      <Wordle checkFinished={this.checkFinished}/>
    </div>
  );
}



export default App;

