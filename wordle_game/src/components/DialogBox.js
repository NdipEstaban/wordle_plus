import React from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPeopleGroup} from '@fortawesome/free-solid-svg-icons';


class DialogBox extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="dialog-box" ref={this.props.dialogRef}>
                <FontAwesomeIcon icon={faPeopleGroup}></FontAwesomeIcon>
                <div className='dialog-box-text'>{this.props.message}</div>
            </div>
        )
    }
}

export default React.forwardRef((props, ref) => <DialogBox {...props} dialogRef = {ref}/>);