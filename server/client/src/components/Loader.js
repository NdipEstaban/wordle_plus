import React from "react";
import '../style/Loader.css';

class Loader extends React.Component{
    constructor(props){
        super(props);

        this.state = {

        };
    }

    render(){
        return(
            <div className="loader-container">
                <div className="loader">
                    <span>W<sup>+</sup></span>
                </div>
            </div>
        )
    }
}

export default Loader;