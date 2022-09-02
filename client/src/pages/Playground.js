import React from 'react';
import '../style/Playground.css';
import { Helmet } from 'react-helmet-async';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPeopleGroup} from '@fortawesome/free-solid-svg-icons';

import DialogBox from '../components/DialogBox';
import LetterGrid from '../components/LetterGrid';
import Keyboard from '../components/Keyboard';
import ControlPanel from '../components/ControlPanel';
import Timer from '../components/Timer';
import MultiplayerGrid from '../components/MultiplayerGrid';
import GameGuide from "../components/GameGuide";
import Loader from '../components/Loader';

import backgroundSound1 from '../audio/background-sound-1.mp3';
import backgroundSound2 from '../audio/vacation.mp3';
import backgroundSound3 from '../audio/summer.mp3';
import click from '../audio/click.mp3';
import submit from '../audio/submitrow.mp3';
import rejected from '../audio/rejectedRow.mp3';

import words from '../models/words';

import {changeKeyboardColor,changeTilesColor, tilePackager, multiplayerCardPackager} from '../models/dataMolders';

const backgroundMusic = [backgroundSound1,backgroundSound2,backgroundSound3];

const clickSound = new Audio(click);
clickSound.volume = 1;
const submitRow = new Audio(submit);
submitRow.volume = 0.8;
const rejectedRow = new Audio(rejected);
rejectedRow.volume = 0.8;



//picking out a random word from the words.js file

//In the tiles array each array is a row and object corresponds to a tile
const tiles = [
  [
    {id:1, value:``, color:''},
    {id:2, value:``, color:''},
    {id:3, value:``, color:''},
    {id:4, value:``, color:''},
    {id:5, value:``, color:''}
  ],
  [
    {id:6, value:``, color:''},
    {id:7, value:``, color:''},
    {id:8, value:``, color:''},
    {id:9, value:``, color:''},
    {id:10, value:``, color:''}
  ],
  [
    {id:11, value:``, color:''},
    {id:12, value:``, color:''},
    {id:13, value:``, color:''},
    {id:14, value:``, color:''},
    {id:15, value:``, color:''}
  ],
  [
    {id:16, value:``, color:''},
    {id:17, value:``, color:''},
    {id:18, value:``, color:''},
    {id:19, value:``, color:''},
    {id:20, value:``, color:''}
  ],
    [
    {id:21, value:``, color:''},
    {id:22, value:``, color:''},
    {id:23, value:``, color:''},
    {id:24, value:``, color:''},
    {id:25, value:``, color:''}
  ],
  [
    {id:26, value:``, color:''},
    {id:27, value:``, color:''},
    {id:28, value:``, color:''},
    {id:29, value:``, color:''},
    {id:30, value:``, color:''}
  ],
];

/*Each array reprents a row which in turn has arrays corresponding to the value of each keyboard
key and it's colour
*/
var qwertyLayout = [
  [['Q','white'],['W','white'],['E','white'],['R','white'],['T','white'],['Y','white'],['U','white'],['I','white'],['O','white'],['P','white']],
  [['A','white'],['S','white'],['D','white'],['F','white'],['G','white'],['H','white'],['J','white'],['K','white'],['L','white']],
  [['Z','white'],['X','white'],['C','white'],['V','white'],['B','white'],['N','white'],['M','white']]
];

var azertyLayout = [
  [['A','white'],['Z','white'],['E','white'],['R','white'],['T','white'],['Y','white'],['U','white'],['I','white'],['O','white'],['P','white']],
  [['Q','white'],['S','white'],['D','white'],['F','white'],['G','white'],['H','white'],['J','white'],['K','white'],['L','white'], ['M','white']],
  [['W','white'],['X','white'],['C','white'],['V','white'],['B','white'],['N','white']]
];

var keyboardLayouts = [qwertyLayout, azertyLayout];

var interval;
let sound = new Audio(backgroundMusic[0]);

class Wordle extends React.Component{
  constructor(props){
    super(props);

    this.rowRef = React.createRef();
    this.dialogRef = React.createRef();

    this.state = {
      tiles:tiles,
      currentTile:1,
      currentWord:this.props.word,
      currentWordIndex:0,
      deleted:false,
      timer:0,
      timerDisplay:'0:0',
      started:true,
      currentRow:0,
      keyLayout:keyboardLayouts[0],
      currentKeyboardIndex:0,
      userWord:[],
      message:'',
      currentTileId:1,
      multiplayer:this.props.multiplayer,
      playing:false,
      gameGuide:false,
      loaded:false,
    };

    this.handleKeyInput = this.handleKeyInput.bind(this);
    this.delete = this.delete.bind(this);
    this.submit = this.submit.bind(this);
    this.clockify = this.clockify.bind(this);
    this.toggleGameGuide = this.toggleGameGuide.bind(this);

    this.switchKeyLayout = this.switchKeyLayout.bind(this);
    this.soundController = this.soundController.bind(this);
  }

  componentDidMount(){
        /*Reset the state each time the playground mounts so when the player tries to return to page the data is refreshed */
        this.setState({
          ...this.state,
          tiles:tiles,
          currentTile:1,
          currentWord:this.props.word,
          currentWordIndex:0,
          deleted:false,
          timer:0,
          timerDisplay:'0:0',
          started:true,
          currentRow:0,
          keyLayout:keyboardLayouts[0],
          currentKeyboardIndex:0,
          userWord:[],
          currentTileId:1,
          multiplayer:this.props.multiplayer,
          playing:false,
          gameGuide:false,
        });
        
    //Launch the background sound
    sound.volume = 0.5;
    sound.play();
    sound.loop = true;

    //Display dialogue box with multiplayer key
    if(this.props.multiplayer == true){
      setTimeout(() => {
        this.setState({
          ...this.state,
          message:`Multiplayer key: \n\n${this.props.sessionKey}`,
          loaded:true,
        });
      }, 200);
      
      setTimeout(() => {
        this.dialogRef.current.classList.add('dialog-box-display');
      }, 500);

      setTimeout(() => {
        this.dialogRef.current.classList.remove('dialog-box-display');
      }, 5000);
    }else{
      this.setState({
        ...this.state,
        loaded:true,
      })
    }

    console.clear();
  }

  componentWillUnmount(){
    sound.pause();
  }

  clockify(){
    interval = setInterval(() => {
      let minutes = (this.state.timer <= 60)? 0:Math.round(this.state.timer/60);
      let seconds = this.state.timer % 60;
      this.setState({
         ...this.state,
        timer:this.state.timer + 1,
        timerDisplay:`${minutes}:${seconds}`
      });
    },995);
  }

  handleKeyInput(e){
    let playing = this.state.playing;
    if(this.state.playing == false){
      this.clockify();
      playing = true;
    }

    clickSound.play();
    let input = e.target.value;
    let currentTile = /*(this.state.deleted == true)?this.state.currentTile + 1:*/this.state.currentTile;
    let nextTile = currentTile <= (this.state.currentTileId + 4)?currentTile + 1:currentTile;
    

    if(this.state.userWord.length < 5 && this.state.currentTile <= this.state.currentTileId + 4){
      
      let newTiles = this.state.tiles.map((row) => {
        return row.map((tile) => {
          if(currentTile == tile.id){
            return({id:tile.id,value:input,color:''});
          }
          return tile;
        });
      });


      this.setState({
        ...this.state,
        tiles:newTiles,
        currentTile:nextTile,
        userWord:[...this.state.userWord, input],
        deleted:false,
        playing:playing
      });
    }

    //this.clockify();

  };

  submit(){
    let userWord = this.state.userWord;
    let newKeyboard = this.state.keyLayout;
    let newTiles = this.state.tiles;
    let rowIndex = this.state.currentRow;
    let currentTile = this.state.currentTile;
    let message;
    let secondKeyboard;

    console.log(userWord);
    

    if(userWord.length < 5){
      rejectedRow.play();

      message = 'Not enough letters';
      this.dialogRef.current.classList.add('dialog-box-display');
      this.rowRef.current.classList.add('tile-refusal');

      this.setState({
        ...this.state,
        message:message
      });

      setTimeout(() => {
        this.dialogRef.current.classList.remove('dialog-box-display');
        this.rowRef.current.classList.remove('tile-refusal');
      }, 1900);

    }
    else if(words.wordList.indexOf(userWord.join('').toLowerCase()) == -1){
      rejectedRow.play();
      message = 'Not in wordList';
      this.dialogRef.current.classList.add('dialog-box-display');
      this.rowRef.current.classList.add('tile-refusal');

      this.setState({
        ...this.state,
        message:message
      });

      setTimeout(() => {
        this.dialogRef.current.classList.remove('dialog-box-display');
        this.rowRef.current.classList.remove('tile-refusal');
      }, 1900);

    }else{
      submitRow.play();
      //Change the color of the tiles accordingly and add submission animation
      newTiles = changeTilesColor({tiles:newTiles,word:this.state.currentWord,rowIndex:rowIndex});
      this.rowRef.current.classList.add('tile-submission');

      //Stop timer
      if(this.state.userWord.join('') == this.state.currentWord || this.state.currentTile >= 30){
        //Timer stops when number of found letters is 5 or when user gets to the last letter tile
        clearInterval(interval);
        let playerWon = this.state.userWord.join('') == this.state.currentWord?true:false;
        

        //if in multiplayer mode send tiles to server when finished game
        setTimeout(() => {
          let tiles = tilePackager(this.state.tiles);
          if(this.props.multiplayer == true){
            this.props.playerGameOver({grid:tiles, time:this.state.timer - 1, row:this.state.currentRow});
            console.log('game finished');
          }
          this.props.setPlayersStats({row:this.state.currentRow, time:this.state.timerDisplay, win:playerWon, grid:tiles});
          this.props.navigate('/gameover');
        }, 1550);    
      }

      //Change the colours of both keyboard layouts so as to facilite switching
      if(keyboardLayouts.indexOf(newKeyboard) == 0){
        newKeyboard = changeKeyboardColor({keyboard:newKeyboard, color:'#97e61b', word:this.state.currentWord, enteredWord:userWord});
        secondKeyboard = changeKeyboardColor({keyboard:keyboardLayouts[1], color:'#97e61b', word:this.state.currentWord, enteredWord:userWord});
        keyboardLayouts[1] = secondKeyboard;
        keyboardLayouts[0] = newKeyboard;
      }else{
        newKeyboard = changeKeyboardColor({keyboard:newKeyboard, color:'#97e61b', word:this.state.currentWord, enteredWord:userWord});
        secondKeyboard = changeKeyboardColor({keyboard:keyboardLayouts[1], color:'#97e61b', word:this.state.currentWord, enteredWord:userWord});
        keyboardLayouts[0] = secondKeyboard;
        keyboardLayouts[1] = newKeyboard;
      }

      //Updates the currentRow of the game on submit indicated by the leading tileId of each row;
      switch(this.state.currentRow){
        case 0:
          currentTile = 6;
          break;
        case 1:
          currentTile = 11;
          break;
        case 2:
          currentTile = 16;
          break;
        case 3:
          currentTile = 21;
          break;
        case 4:
          currentTile = 26;
          break;
      }
  
      setTimeout(() => {
        this.rowRef.current.classList.remove('tile-submission');

        this.setState({
          ...this.state,
          tiles:newTiles,
          keyLayout:newKeyboard,
          currentRow:this.state.currentRow + 1,
          currentTile:currentTile,
          currentTileId:currentTile,
          userWord:[]
        });

        setTimeout(() =>{
          //send players data if in multiplayer mode
          if(this.props.multiplayer == true){
            this.props.sendPlayerData({grid:multiplayerCardPackager(this.state.tiles, this.state.currentRow)});
          }
        },1);
      }, 1500);

    }
  }


  delete(){
    clickSound.play(); 
    let tileIndex = this.state.currentTile;
    let newTiles = this.state.tiles;
    let rowIndex = this.state.currentRow;
    let userWord = this.state.userWord;
    let nextTileIndex = (tileIndex > this.state.currentTileId)?tileIndex - 1:this.state.currentTileId;
    let deleted = (this.state.currentTile == this.state.currentTileId)?false:true;

    console.log(nextTileIndex);

    userWord.pop();

    newTiles = newTiles.map((row) => {
      if(newTiles.indexOf(row) == rowIndex){
        return row.map((tile) => {
          if(tile.id == tileIndex - 1){
            return {id:tile.id, value:'', color:tile.color};
          }
          return tile;
        });
      }
      return row;
    });

    this.setState({
      ...this.state,
      tiles:newTiles,
      userWord:userWord,
      currentTile:nextTileIndex,
      deleted:deleted
    });
  }

  //switch between azerty and qwerty keyboard layouts
  switchKeyLayout(){
    clickSound.play();
    let keyboardLayoutsIndex = (this.state.currentKeyboardIndex == 0)?1:0;
    let newLayout = keyboardLayouts[keyboardLayoutsIndex];
    this.setState({
      ...this.state,
      keyLayout:newLayout,
      currentKeyboardIndex:keyboardLayoutsIndex
    });
  }

  soundController(n){
    clickSound.play();
    if(n == false){
      sound.volume = 0;
    }else{
      sound.volume = 0.5;
    }
  }

  toggleGameGuide(){
    this.setState({
      ...this.state,
      gameGuide:!this.state.gameGuide,
    });
  }

  render(){
    return(
        this.state.loaded == true?
        <div>
          <Helmet>
            <title>Wordle+</title>
            <meta name='description' content='play wordle as much as you want and learn the meaning of each word, equally multiplayer wordle game' />
            <link rel='canonical' href='/playground' />
          </Helmet>
          {this.state.gameGuide == true?<GameGuide toggleGameGuide={this.toggleGameGuide}/>:''}
            <DialogBox ref={this.dialogRef} message={this.state.message}/>
            <ControlPanel multiplayer={this.props.multiplayer} toggleGameGuide={this.toggleGameGuide} sessionKey={this.props.sessionKey} soundController = {this.soundController} switchKeyLayout = {this.switchKeyLayout}/>
            {this.state.multiplayer == true?<MultiplayerGrid playersData = {this.props.playersData}/>:''}
          <div className='wordle-game'>
            <LetterGrid ref={this.rowRef} row = {this.state.currentRow} tiles = {this.state.tiles} currentTile = {this.state.currentTile}/>
            <Timer timerDisplay = {this.state.timerDisplay}/>
            <Keyboard submit={this.submit} input = {this.handleKeyInput} delete={this.delete} keyLayout={this.state.keyLayout}/>
          </div>
        </div>
        :
        <Loader />
    )
  }
}

export default Wordle;
