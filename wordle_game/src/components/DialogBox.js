import React from 'react'

class DialogBox extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="dialog-box" ref={this.props.dialogRef}>
                <div className='dialog-box-text'>{this.props.message}</div>
            </div>
        )
    }
}

export default React.forwardRef((props, ref) => <DialogBox {...props} dialogRef = {ref}/>);