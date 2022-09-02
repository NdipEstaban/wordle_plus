import React from "react";
import '../style/GameOverScreen.css';
import {faStopwatch,faBullseye} from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/react-fontawesome';

import { Helmet } from "react-helmet-async";

import mockery from '../audio/mockery.mp3';
import winner from '../audio/success.mp3';

import { shareData } from "../models/dataMolders";

import Loader from '../components/Loader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let lostSound = new Audio(mockery);
let winSound = new Audio(winner);

const fetchWordData = async(word) => {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) {
        throw new Error('Data coud not be fetched!');
    } else {
        return response.json();
    }
};

const emojis = {
    win:['😊','😁','😎','🥰'],
    lost:['😐','😕','🤭','😥'],
};

var green = '#97e61b';
var white = 'white';

let randomInt = [Math.floor(Math.random() * 4)];
class GameOverScreen extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            loaded:false,
            tilesColor:this.props.playerStats.win == true?green:white,
            wordDetails:[
                {meanings:[
                    {definitions:[
                        {definition:'😓Sorry, some connection issues',
                        example:'',
                    }
                    ]}
                ]}
            ],
            finishedPlayers:this.props.finishedPlayers,
            playerStats:this.props.playerStats,
            emoji:(this.props.playerStats.win == true)?emojis.win[randomInt]:emojis.lost[randomInt]
            // emoji:this.props.playerStats.win == true?emojis.win[randomInt]:emojis.loss[randomInt]
        };

    }

    componentDidMount(){
        fetchWordData(this.props.word.join('')).then((res) =>{
            this.setState({
                ...this.state, 
                wordDetails:res,
                loaded:true,
            });
        }).catch((e) => {
            console.log('wordle-plus');
        });

        setTimeout(() => {
            this.setState({
                ...this.state,
                loaded:true
            })
        }, 5000);

        //Play a sound according playerStats
        if(this.state.playerStats.win == true){
            winSound.play();
        }else{
            lostSound.play();
        }

    }

    render(){
        return(
            this.state.loaded == false?
            <Loader />
            :
            <div className='game-over-container'>
                <Helmet>
                    <meta name='robots' content='noindex' />
                </Helmet>
                <div className='game-emoji'>
                    {this.state.emoji}
                </div>
                <div className="game-over">
                <div className="player-details">
                    <h1>{this.props.playerName}</h1>
                    <div className='game-over-card'>
                    <div className ="player-grid">
                            {this.props.playerStats.grid.map((row) => {
                              return (
                                <div class="player-grid-row">
                                  {row.map((tile) => {
                                    return <div className="grid-circle" style={{background:tile}}></div>
                                  })}
                                </div>
                              )
                            })}
                          </div>
                    
                    </div>
                    <h3 className="player-stats"><FontAwesomeIcon icon={faStopwatch}/><span>{this.state.playerStats.time}</span></h3>
                    <h3 className="player-stats"><FontAwesomeIcon icon={faBullseye}/><span>{this.state.playerStats.row}/6</span></h3>
                </div>
                {/*When not in multiplayer mode the definition of the word is displayed*/ }
                {this.props.multiplayer == false?
                <div className='word-details'>
                <div className='word'>
                    {this.props.word.map((letter) => {
                        return(<div className="word-tile" style={{background:`${this.state.tilesColor}`}}>{letter}</div>)
                    })}
                </div>
                <div className='word-defn'>
                    <h4>Definition</h4>
                    {this.state.wordDetails[0].meanings[0].definitions[0].definition}
                </div>
                <div className='word-examples'>
                    <h4>Example</h4>
                    {this.state.wordDetails[0].meanings[0].definitions[0].example}
                </div>
            </div>
            :
            <table>
            <tr>
                <th>Position</th>
                <th>Name</th>
                <th>Attempts</th>
                <th>Time</th>
            </tr>
            {this.props.finishedPlayers.map((player, index) => {
                return(
                    <tr>
                        <td>{index + 1}</td>
                        <td>{player.name}</td>
                        <td>{player.row}/6</td>
                        <td>{(player.time <= 60)?`0:${player.time % 60}`:`${Math.round(this.player.time/60)}:${player.time % 60}`}</td>
                    </tr>
                );
            })}
        </table>
                }
                
                {/*The table displays in only when in multiplayer mode*/}
                
            </div>
            <div className="game-over-btns">
                {/*Display "play again" button only when not in multiplayer */}
                {this.props.multiplayer == false?
                <button onClick={() => this.props.playAgain()}>Play again</button>
                :
                ''}
                <button onClick={() => shareData(this.props.playerStats)}>Share</button>
                <button onClick={() => this.props.navigate('/')}>Home</button>
            </div>
            </div>
        )
    }
}

export default GameOverScreen;