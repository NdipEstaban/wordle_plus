import React from "react";

class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.signName = this.signName.bind(this);
        this.signRoom = this.signRoom.bind(this);
    }

    signName(event){
        this.props.playerName({name:event.target.value});
    }

    signRoom(){

    }

    render(){
        return(
            <div>
                Name
                <input type="text" onChange={this.signName}></input>
                <h4>Room</h4>
                <input type="room" onChange={this.signRoom}></input>
            </div>
        )
    }
}

export default SignIn;