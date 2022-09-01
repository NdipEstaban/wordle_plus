import React from "react";
import '../style/ErrorPage.css';
import Logo from '../img/wordle-logo.png';

import { Helmet } from "react-helmet-async";

class Error404 extends React.Component{
    constructor(props){
        super(props);

        this.state = {

        };

        this.navigateHome = this.navigateHome.bind(this);
    }

    navigateHome(){
        this.props.navigate('/');
    }

    

    render(){
        return(
            <div className='error-page'>
                <Helmet>
                    <meta name='robots' content='noindex' />
                </Helmet>
                <img className='error-logo' src={Logo} alt='game-logo' />
                <h1>Error 404</h1>
                <h2>Oops, this page is not available right now, please head to the homepage</h2>
                <button onClick={() => {this.navigateHome()}}>Go to home page</button>
            </div>
        );
    }
}

export default Error404;