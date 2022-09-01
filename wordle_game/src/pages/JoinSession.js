import React from 'react';
import '../style/JoinSession.css';

import Loader from '../components/Loader';
import DialogBox from '../components/DialogBox';

class JoinSession extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            key:'',
        };

        this.inputKey = this.inputKey.bind(this);
        this.joinRoom = this.joinRoom.bind(this);
    }

    inputKey(event){
        var key = event.target.value;
        this.setState({
            ...this.state,
            key:key
        });
    }

    joinRoom(){
        let key = this.state.key;
        this.props.joinRoom(key);
    }

    render(){
        return(
            this.props.loaded == false?
            <Loader />
            :
            <div className="join-session">
            <div className="form">
                <label for='session-key'>
                    Session key
                    <input type='text' id='session-key' onChange={this.inputKey} placeholder='obtain session key from your friend'></input>
                </label>
                <button onClick={this.joinRoom}>Join</button>
            </div>
        </div>
        )
    }
}

export default JoinSession;