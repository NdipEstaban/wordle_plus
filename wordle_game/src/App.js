import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";

import Wordle from './pages/Playground';
import './style/Playground.css';
import './style/Home.css';
import Home from './pages/Home';
import  SignIn from './pages/MultiplayerConnection';
import MultiplayerConnection from './pages/MultiplayerConnection';
import JoinSession from './pages/JoinSession';
import GameOverScreen from './pages/GameOverScreen';
import Error404 from './pages/Error404page';
import GameGuide from './components/GameGuide';
import Loader from './components/Loader';
import io from 'socket.io-client';
import words from './models/words';
import DialogBox from './components/DialogBox';

const socket = io.connect("http://localhost:3001");

//picking word
var currentWord = words.wordList[Math.floor(Math.random() * words.wordList.length)];

function App(){
  const [loaded, setLoaded] = useState(true);

  const [word, setWord] = useState(currentWord.toUpperCase());
  const [playerName, setName] = useState('');
  const [session, setSessionAvailability] = useState('');
  const [playersData, setPlayersData] = useState([]);
  const [sessionKey, setSessionKey] = useState('');
  const [listFinishedPlayers, setListFinishedPlayers] = useState([]);
  const [playerStats, setPlayerStats] = useState({row:0, time:0, win:false, grid:[]});

  const [playing, setPlaying] = useState(false);
  const [multiplayer, setMultiplayer] = useState(false);
  let navigate = useNavigate();

  const playAgain = () => {
    currentWord = words.wordList[Math.floor(Math.random() * words.wordList.length)];
    setWord(currentWord.toUpperCase());
    setMultiplayer(false);
    setPlayerStats({row:0, time:0, win:false, grid:[]});
    navigate('/playground');
  };

  const sendPlayerData = ({grid = []} = {}) => {
    socket.emit("send_player_data", {key:sessionKey,name:playerName,grid:grid});
  };

  const playerFinished = ({grid = [], time = 0, row = 0} = {}) => {
    socket.emit('notify_player_finished', {key:sessionKey,name:playerName,grid:grid,timeInSeconds:time,row:row});
  };

  const createRoom = (name = playerName) => {
    socket.emit('create_room', {host:name, word:word});
    setLoaded(false);
  };

  const joinRoom = (playerkey) =>{
    socket.emit("join_room", {key:playerkey,player:playerName});
    setLoaded(false);
  };

  useEffect(() => {
    socket.on("recieve_players_data", (data) => {
      setPlayersData(data.playersData);
    });

    socket.on("session_non_existent",(data) => {
      alert('Oops! session may not be available please check the session key then retry');
      setSessionAvailability(false);
      setLoaded(true);

    });

    socket.on('session_existent', (data) => {
      setLoaded(true);
      setSessionAvailability(true);
      setWord(data.word);
      setMultiplayer(true);
      navigate('/playGround');
      setSessionKey(data.sessionKey);
    });

    socket.on('session_key', (data) => {
      setSessionKey(data.sessionKey);
      setLoaded(true);
    });

    socket.on('list_finished_players', (data) => {
      let finishedPlayers = data.playersRoom.finished;
      finishedPlayers = finishedPlayers.sort((a,b) => a.time - b.time);
      
      setListFinishedPlayers(finishedPlayers);
      setPlayersData(data.playersRoom.players);
    });
  }, [socket]);

  return(
      <Routes>
        {/*TODO:Set back the home directory to Home.js*/ }
        <Route path="/" element={<Home setPlaying={setPlaying} setMultiplayer={setMultiplayer} navigate={navigate}/>}/>
        <Route path='/multiplayer' element={<MultiplayerConnection playerName={playerName} loaded={loaded} setName={setName} createSession={createRoom} setMultiplayer={setMultiplayer} navigate={navigate}/>} />
        <Route path='/join' element={<JoinSession loaded={loaded} joinRoom={joinRoom}/>} />
        <Route path='/playground' element={<Wordle word={word} setPlayersStats={setPlayerStats} sessionKey={sessionKey} playerGameOver={playerFinished} playersData={playersData} multiplayer={multiplayer} sendPlayerData={sendPlayerData} navigate={navigate}/>} />
        <Route path='/gameover' element = {<GameOverScreen playAgain={playAgain} navigate={navigate} multiplayer={multiplayer} word={word.split('')} finishedPlayers ={listFinishedPlayers} playerName={playerName} playerStats={playerStats}/>} />
        <Route path='*' element={<Error404 navigate={navigate}/>} />
      </Routes>
  );
}



export default App;

