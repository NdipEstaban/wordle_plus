import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { shareGame } from '../models/dataMolders';

var letterInterval;
class Home extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            currentTile:setInterval(() => {
                var tile = this.state.currentTile;
                tile = (tile >= 5)?0:tile + 1;
                this.setState({
                    ...this.state,
                    currentTile:tile,
                });
            }, 1000),
        };

        this.play = this.play.bind(this);
        this.playWithFriends = this.playWithFriends.bind(this);
    }

    play(){
        this.props.setPlaying(true);
        this.props.setMultiplayer(false);
        this.props.navigate('/playground');
    }

    playWithFriends(){
        this.props.setMultiplayer(true);
        this.props.navigate('/multiplayer');
    }

    render(){
        return(
            <div className='home'>
                <h1 className="home-title">
                    <div className={(this.state.currentTile == 0)?'game-title-letter input-animation':'game-title-letter'} id="title-letter-W">
                        <span>W</span>
                    </div>
                    <div className={(this.state.currentTile == 1)?'game-title-letter input-animation':'game-title-letter'} id="title-letter-O">
                        <span>O</span>
                    </div>
                    <div className={(this.state.currentTile == 2)?'game-title-letter input-animation':'game-title-letter'} id="title-letter-R">
                        <span>R</span>
                    </div>
                    <div className={(this.state.currentTile == 3)?'game-title-letter input-animation':'game-title-letter'} id="title-letter-D">
                        <span>D</span>
                    </div>
                    <div className={(this.state.currentTile == 4)?'game-title-letter input-animation':'game-title-letter'} id="title-letter-L">
                        <span>L</span>
                    </div>
                    <div className={(this.state.currentTile == 5)?'game-title-letter input-animation':'game-title-letter'} id="title-letter-E">
                        <span>E</span>
                    </div>
                    <div className='plus-symbol'>
                        +
                    </div>
                </h1>
                <div class='home-controls'>
                    <button id='play-btn' onClick={this.play}>PLAY</button>
                    <button id='play-friends-btn' onClick={this.playWithFriends}>PLAY WITH FRIENDS</button>
                    <button id='share-btn' onClick={() => shareGame()}>SHARE</button>
                    <a href="mailto:wordleplus@gmail.com"><button id='about-btn'>FEEDBACK</button></a>
                </div>
            </div>
        );
    }
}

export default Home;