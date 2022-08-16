import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVolumeHigh, faVolumeMute,faPeopleGroup,faKeyboard, faQuestion} from "@fortawesome/free-solid-svg-icons";

import click from '../audio/click.mp3';

let clickSound = new Audio(click);

class ControlPanel extends React.Component{
    constructor(props){
        super(props);

        this.multiplayerKeyRef = React.createRef();

        this.state = {
            muted:false,
            key:false
        };

        this.controlSound  = this.controlSound.bind(this);
        this.multiplayerKey = this.multiplayerKey.bind(this);
    }

    componentDidMount(){
        if(this.props.multiplayer == true){
            setTimeout(() => {
                this.multiplayerKeyRef.current.classList.add('control-panel-key');
                setTimeout(() => {
                    this.multiplayerKeyRef.current.classList.remove('control-panel-key');
                }, 2000);
            }, 4000);
        }
    }

    multiplayerKey(){
        clickSound.play();

        this.setState({
            ...this.state,
            key:true
        });
        this.multiplayerKeyRef.current.classList.add('control-panel-key');

        setTimeout(() => {
            this.setState({
                ...this.state,
                key:false
            });
            this.multiplayerKeyRef.current.classList.remove('control-panel-key');
        }, 5000);
    }

    controlSound(){
        clickSound.play();
        
        this.props.soundController(this.state.muted);

        this.setState({
            ...this.state,
            muted:this.state.muted == true?false:true
        });
    }

    render(){
        return(
            <div className='control-panel'>
                <h2>WDLE</h2>
                {this.props.multiplayer == true?
                <button ref={this.multiplayerKeyRef} onClick = {() => this.multiplayerKey()} name='end-session'>
                    <FontAwesomeIcon icon={faPeopleGroup}></FontAwesomeIcon> 
                    {this.state.key == true?this.props.sessionKey:''}
                </button>:''
                }
                <button onClick = {() => this.props.switchKeyLayout()} name='key-layout'>
                    <FontAwesomeIcon icon={faKeyboard}></FontAwesomeIcon>
                </button>
                <button name='mute-btn' onClick = {() => this.controlSound()}>
                    <FontAwesomeIcon icon={this.state.muted == true?faVolumeMute:faVolumeHigh}></FontAwesomeIcon>
                </button>
                <button name='restart'>
                    <FontAwesomeIcon icon={faQuestion}></FontAwesomeIcon>
                </button>
                
                
            </div>
        )
    }
}

export default ControlPanel