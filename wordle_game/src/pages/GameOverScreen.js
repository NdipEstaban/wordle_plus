import React from "react";
import '../style/GameOverScreen.css';
import mockery from '../audio/mockery.mp3';
import winner from '../audio/success.mp3';

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
            tilesColor:this.props.playerStats.win == true?green:white,
            wordDetails:[
                {meanings:[
                    {definitions:[
                        {definition:'😓Network issues',
                        example:'sorry😓, there are no examples for this word',
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
            });
        }).catch((e) => {
            
        });

        //Play a sound according playerStats
        if(this.state.playerStats.win == true){
            winSound.play();
        }else{
            lostSound.play();
        }

        }

    render(){
        return(
            <div className='game-over-container'>
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
                                    return <div className="grid-circle"></div>
                                  })}
                                </div>
                              )
                            })}
                          </div>
                    
                    </div>
                    <h3>{this.state.playerStats.time}</h3>
                    <h3>{this.state.playerStats.row}/6</h3>
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
                        <td>{index}</td>
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
                <button>Play again</button>
                <button>Home</button>
            </div>
            </div>
        )
    }
}

export default GameOverScreen;