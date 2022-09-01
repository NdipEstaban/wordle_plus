import React from "react";

class Timer extends React.Component{
    constructor(props){
        super(props);

        this.state= {
            timer:0
        };
    }

    render(){
        return(
            <div className="timer">{this.props.timerDisplay}</div>
        )
    }
}

export default Timer;