import React from "react";
import '../style/GameGuide.css';
import {faPeopleGroup} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class GameGuide extends React.Component{
    constructor(props){
        super(props);


        this.state={
            open:true
        }
        this.closeGuide = this.closeGuide.bind(this);
    }

    closeGuide(){
        this.setState({
            ...this.state,
            open:false
        })
    }

    render(){
        return(
            <div className="game-guide">
            <button id='close-btn' onClick={this.closeGuide()}>X</button>
            <h1>HOW TO PLAY 😊</h1>
            <p>You have 6 attempts to guess the mystery word</p>
            <p>Each gues must be a valid 5-letter English word</p>
            <p>
                After each guess, the color of the tiles will change to show how close
                you are to finding the mystery word.
            </p>
            <p>
                Each tile will have a different color, with each color guiding you towards guessing
                the word. Checkout the following examples to give yourself a boost.
            </p>
            <h2>Examples</h2>
            <div className="example-word">
                <div className="example-word-letter" id='success-letter'>
                    H
                </div>
                <div className="example-word-letter">
                    E
                </div>
                <div className="example-word-letter">
                    L
                </div>
                <div className="example-word-letter">
                    L
                </div>
                <div className="example-word-letter">
                    O
                </div>
            </div>
            <p>The letter H is found in the word and in the exact tile</p>
            <div className="example-word">
                <div className="example-word-letter">
                    L
                </div>
                <div className="example-word-letter">
                    E
                </div>
                <div className="example-word-letter" id='failure-letter'>
                    A
                </div>
                <div className="example-word-letter">
                    R
                </div>
                <div className="example-word-letter">
                    N
                </div>
            </div>
            <p>The letter is A is found in the word but not on the right tile</p>
            <div className="example-word">
                <div className="example-word-letter">
                    F
                </div>
                <div className="example-word-letter">
                    U
                </div>
                <div className="example-word-letter">
                    N
                </div>
                <div className="example-word-letter">
                    N
                </div>
                <div className="example-word-letter">
                    Y
                </div>
            </div>
            <p>The letter N is not found anywhere in the word</p>
            <h2>Wordle+ is fun with friends🤗</h2>
            <p>
                Play up to 10 at the same time and see who solves the wordle first.
                You can obtain your session key from the <FontAwesomeIcon icon={faPeopleGroup} />
                button. Learn new words while having fun😁 
            </p>
        </div>
        )
    }
}

export default GameGuide;
