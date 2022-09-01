import React from "react";
import '../style/MultiplayerConnection.css';
import { Helmet } from "react-helmet-async";

import Loader from "../components/Loader";

class MultiplayerConnection extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            mode:'single',
            name:'',
        };

        this.handleName = this.handleName.bind(this);
        this.createSession = this.createSession.bind(this);
        this.joinSession = this.joinSession.bind(this);
    }

    componentDidMount(){
        if(this.props.playerName.length >= 2){
            this.props.navigate('/playground');
        }
    }

    handleName(e){
        this.props.setName(e.target.value);
    }

    createSession(){
        if(this.props.playerName.length < 2){
            alert('Sorry, please enter a valid name so your friends can recognize you');
        }
        else{
            this.props.setMultiplayer(true);
            this.props.createSession();
            this.props.navigate('/playground');
        }
    }

    joinSession(){
        if(this.props.playerName < 2){
            alert('enter a name so your friends can recognize you');
        }else{
            this.props.navigate('/join');
        }
    }

    

    render(){
        return(
            this.props.loaded == false?
            <Loader />
            :
            <div className="multiplayer-conn">
                <Helmet>
                    <title>Play with friends</title>
                    <meta name='description' content="challenge your friends to a multiplayer wordle game and build your vocabulary" />
                    <link rel="canonical" href="/multiplayer" />
                </Helmet>
                <label>Name
                <input type='text' placeholder="enter your name" maxLength={10} minLength={2} onChange={(e) => this.handleName(e)}/>
                </label>
                <div className='submit-btns-container'>
                    <button id='new-session' onClick={this.createSession}>Create session</button>
                    <button id='old-session' onClick={this.joinSession}>Join a session</button>
                </div>
            </div>
        );
    }
}

export default MultiplayerConnection;