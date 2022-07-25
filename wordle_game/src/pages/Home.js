import React from 'react';

class Home extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className='home'>
                <h1>Wordle<sup>+</sup></h1>
                <div class='home-controls'>
                    <button id='play-btn'>PLAY</button><br></br>
                    <button id='play-friends-btn'>PLAY WITH FRIENDS</button>
                </div>
            </div>
        );
    }
}

export default Home;