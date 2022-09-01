import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDeleteLeft} from "@fortawesome/free-solid-svg-icons";

class Keyboard extends React.Component{
    constructor(props){
        super(props);

        this.state = {};
    }

    render(){
        return(
            <div className='keyboard' onChange={() => this.props.clockify}>
                <div className='keyboard-row'>
                    {this.props.keyLayout[0].map((item) => {return(<button name={item[0]} value = {item[0]} style={{background:item[1]}} className = 'keyboard-btn' onClick = {(e)=>{this.props.input(e)}}>{item[0]}</button>);})}
                </div>
                <div className='keyboard-row'>
                    {this.props.keyLayout[1].map((item) => {return(<button name={item[0]} value = {item[0]} style={{background:item[1]}} className = 'keyboard-btn' onClick = {(e)=>{this.props.input(e)}}>{item[0]}</button>);})}
                </div>
                <div className='keyboard-row'>
                    <button name='enter' id='enter-btn' onClick={() => this.props.submit()} className='keyboard-special-btn keyboard-btn'>Enter</button>
                    {this.props.keyLayout[2].map((item) => {return(<button name={item[0]} value = {item[0]} style={{background:item[1]}} className = 'keyboard-btn' onClick = {(e)=>{this.props.input(e)}}>{item[0]}</button>);})}
                    <button name='delete' class="keyboard-special-btn keyboard-btn" value='delete' onClick={() => this.props.delete()}>
                        <FontAwesomeIcon icon={faDeleteLeft}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        )
    }
}

export default Keyboard;