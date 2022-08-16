import React from "react";
import '../style/MultiplayerConnection.css';

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

    handleName(e){
        let name = e.target.value;
        this.setState({
            ...this.state,
            name:name
        });
    }

    createSession(){
        if(this.state.name.length < 2){
            alert('enter a name so your friends can recognize you');
        }
        else{
            this.props.setMultiplayer(true);
            this.props.setName(this.state.name);
            this.props.createSession(this.state.name);
            this.props.navigate('/playground');
        }
    }

    joinSession(){
        if(this.state.name < 2){
            alert('enter a name so your friends can recognize you');
        }else{
            this.props.setName(this.state.name);
            this.props.navigate('/join');
        }
    }

    

    render(){
        return(
            <div className="multiplayer-conn">
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