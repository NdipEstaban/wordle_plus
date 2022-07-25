import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVolumeHigh, faVolumeMute,faPeopleGroup,faKeyboard, faQuestion} from "@fortawesome/free-solid-svg-icons";


class ControlPanel extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            muted:false,
            key:false
        };

        this.multiplayerKeyRef = React.createRef();

        this.controlSound  = this.controlSound.bind(this);
        this.multiplayerKey = this.multiplayerKey.bind(this);
    }

    multiplayerKey(){

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
        this.setState({
            ...this.state,
            muted:this.state.muted == true?false:true
        });

        this.props.soundController(this.state.muted);
    }

    render(){
        return(
            <div className='control-panel'>
                <h2>WDLE</h2>
                <button ref={this.multiplayerKeyRef} onClick = {() => this.multiplayerKey()} name='end-session'>
                    <FontAwesomeIcon icon={faPeopleGroup}></FontAwesomeIcon> 
                    {this.state.key == true?'3j4h3jh':''}
                </button>
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