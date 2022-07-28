import React, { useEffect, useState } from 'react';
import Wordle from './pages/Playground';
import './style/Playground.css';
import './style/Home.css';
import Home from './pages/Home';
import  SignIn from './pages/PlayerSignIn';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

function App(){
  const [playerName, setName] = useState('');
  const [playersData, setPlayersData] = useState([]);

  const collectPlayerName = ({name = ''} = {}) => {
    setName(name);
  }

  const sendPlayerData = ({grid = []} = {}) => {
    socket.emit("send_player_data", {name:playerName,grid:grid});
  };

  const playerFinished = ({grid = [], time = 0} = {}) => {
    socket.emit('notify_player_finished', {name:playerName,grid:grid,timeInSeconds:time})
  };

  useEffect(() => {
    socket.on("recieve_players_data", (data) => {
      setPlayersData(data);
    });

    socket.on("list_finished_players", (data) => {
      console.log('list has been recieved');
    })
  }, [socket]);

  return(
    <div>
      <Home />
      {/* <SignIn playerName = {collectPlayerName}/>
      <Wordle playersData={playersData} playerGameOver={playerFinished} sendPlayerData={sendPlayerData}/> */}
    </div>
  );
}



export default App;

