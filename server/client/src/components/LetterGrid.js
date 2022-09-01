import React, { forwardRef } from "react";

class LetterGrid extends React.Component{
    constructor(props){
        super(props);
        this.state = {};

    }
    
    render(){
        return(
            <div className='letter-grid'>
                <div id='row1' class='letter-rows' ref={(this.props.row == 0)?this.props.rowRef:''}>
                    {this.props.tiles[0].map((i) => {return(<div className={(this.props.currentTile == i.id && this.props.row == 0)?'current-box input-boxes':'input-boxes'} style={{background:i.color}}><span>{i.value}</span></div>)})}
                </div>
                <div id='row2' class='letter-rows' ref={(this.props.row == 1)?this.props.rowRef:''}>
                    {this.props.tiles[1].map((i) => {return(<div className={(this.props.currentTile == i.id && this.props.row == 1)?'current-box input-boxes':'input-boxes'} style={{background:i.color}}><span>{i.value}</span></div>)})}
                </div>
                <div id='row3' class='letter-rows' ref={(this.props.row == 2)?this.props.rowRef:''}>
                    {this.props.tiles[2].map((i) => {return(<div className={(this.props.currentTile == i.id && this.props.row == 2)?'current-box input-boxes':'input-boxes'} style={{background:i.color}}><span>{i.value}</span></div>)})}
                </div>
                <div id='row4' class='letter-rows' ref={(this.props.row == 3)?this.props.rowRef:''}>
                    {this.props.tiles[3].map((i) => {return(<div className={(this.props.currentTile == i.id && this.props.row == 3)?'current-box input-boxes':'input-boxes'} style={{background:i.color}}><span>{i.value}</span></div>)})}
                </div>
                <div id='row5' class='letter-rows' ref={(this.props.row == 4)?this.props.rowRef:''}>
                    {this.props.tiles[4].map((i) => {return(<div className={(this.props.currentTile == i.id && this.props.row == 4)?'current-box input-boxes':'input-boxes'} style={{background:i.color}}><span>{i.value}</span></div>)})}
                </div>
                <div id='row6' class='letter-rows' ref={(this.props.row == 5)?this.props.rowRef:''}>
                    {this.props.tiles[5].map((i) => {return(<div className={(this.props.currentTile == i.id && this.props.row == 5)?'current-box input-boxes':'input-boxes'} style={{background:i.color}}><span>{i.value}</span></div>)})}
                </div>
            </div>
        )
    }
}

export default React.forwardRef((props, ref) => <LetterGrid {...props} rowRef = {ref}/>);