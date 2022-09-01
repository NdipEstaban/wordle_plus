import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp, faArrowDown} from "@fortawesome/free-solid-svg-icons";

const tiles = [
    [
      {id:1, value:``, color:''},
      {id:2, value:``, color:''},
      {id:3, value:``, color:''},
      {id:4, value:``, color:''},
      {id:5, value:``, color:''}
    ],
    [
      {id:6, value:``, color:''},
      {id:7, value:``, color:''},
      {id:8, value:``, color:''},
      {id:9, value:``, color:''},
      {id:10, value:``, color:''}
    ],
    [
      {id:11, value:``, color:''},
      {id:12, value:``, color:''},
      {id:13, value:``, color:''},
      {id:14, value:``, color:''},
      {id:15, value:``, color:''}
    ],
    [
      {id:16, value:``, color:''},
      {id:17, value:``, color:''},
      {id:18, value:``, color:''},
      {id:19, value:``, color:''},
      {id:20, value:``, color:''}
    ],
      [
      {id:21, value:``, color:''},
      {id:22, value:``, color:''},
      {id:23, value:``, color:''},
      {id:24, value:``, color:''},
      {id:25, value:``, color:''}
    ],
    [
      {id:26, value:``, color:''},
      {id:27, value:``, color:''},
      {id:28, value:``, color:''},
      {id:29, value:``, color:''},
      {id:30, value:``, color:''}
    ],
  ];
  
let modelPlayers = [
 {
  name:'Estabarnaton',
  grid:[
    [ '#97e61b', '', '', '#e69c1b', '' ],
    [ '', '#e69c1b', '', '#97e61b', '' ],
    [ '', '#97e61b', '', '', '#e69c1b' ],
    [ '', '', '#97e61b', '', '#e69c1b' ],
    [ '', '', '', '', '' ],
    [ '', '', '', '', '' ]
  ]
 },
 {
  name:'Rebecca',
  grid:[
    [ '', '', '', '', '' ],
    [ '', '#e69c1b', '#97e61b', '', '' ],
    [ '', '#97e61b', '', '', '#e69c1b' ],
    [ '', '', '#97e61b', '', '#e69c1b' ],
    [ '', '#97e61b', '', '', '' ],
    [ '', '', '', '#e69c1b', '' ]
  ]
 },
 {
  name:'Pablo',
  grid:[
    [ '', '', '', '#e69c1b', '' ],
    [ '', '#e69c1b', '', '', '' ],
    [ '', '#97e61b', '', '', '#e69c1b' ],
    [ '', '#97e61b', '#97e61b', '', '' ],
    [ '', '', '', '#e69c1b', '' ],
    [ '', '#97e61b', '', '', '' ]
  ]
 },
 {
  name:'Reyes',
  grid:[
    [ '', '', '', '#e69c1b', '' ],
    [ '', '#e69c1b', '', '', '' ],
    [ '#e69c1b', '#97e61b', '', '', '#e69c1b' ],
    [ '', '', '#97e61b', '', '' ],
    [ '', '', '', '', '' ],
    [ '', '#97e61b', '', '#97e61b', '' ]
  ]
 },
 {
  name:'Juan',
  grid:[
    [ '', '', '', '#e69c1b', '' ],
    [ '', '#e69c1b', '#97e61b', '#97e61b', '' ],
    [ '', '#97e61b', '', '', '' ],
    [ '', '', '', '', '#e69c1b' ],
    [ '', '', '#e69c1b', '', '' ],
    [ '', '', '#97e61b', '', '' ]
  ]
 }
];

var scrolldelay;

class MultiplayerGrid extends React.Component{
    constructor(props){
        super(props);

        this.playersRef = React.createRef();
        
        this.scrollUp = this.scrollUp.bind(this);
        this.scrollDown = this.scrollDown.bind(this);
    }

    componentDidMount(){
      let scrollList = this.playersRef.current;
      let scrollSpeed = (scrollList.scrollHeight-scrollList.clientHeight)/ scrollList.clientHeight;
      scrollSpeed = Math.round(scrollSpeed);

      const scroll = () => {
        if(Math.round(scrollList.scrollHeight - scrollList.scrollTop) == scrollList.clientHeight){
          scrollList.scrollTo(0, 0);
        }else{
          scrollList.scrollBy({top:50, behavior:'smooth'});
        }
      };

      scrolldelay = setInterval(scroll,2000);
    }
    
    scrollDown(){
      let scrollList = this.playersRef.current;
      scrollList.scrollBy({top:50, behavior:'smooth'});
      console.log('down');

    }

    scrollUp(){
      let scrollList = this.playersRef.current;
      scrollList.scrollBy({top:-50, behavior:'smooth'});
      console.log('up');
    }

    render(){
        return(
            <div class='multiplayer-carousel'>
                <button id='carousel-btn-forward' className = "carousel-btn" onClick={() => this.scrollUp()} aria-label='carousel-forward'>
                  <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
                </button>

                <ul ref={this.playersRef}>
                    {this.props.playersData.map((player) => {
                      return (
                        <li key={player.name} className='player-card'>
                          <div className ="player-grid">
                            {player.grid.map((row) => {
                              return (
                                <div class="player-grid-row">
                                  {row.map((tile) => {
                                    return <div className="grid-circle" style={{background:tile}}></div>
                                  })}
                                </div>
                              );
                            })}
                          </div>
                          <div className="player-name">{player.name}</div>
                        </li>
                      )
                    })}
                </ul>
                <button id='carousel-btn-backward' onClick={() => this.scrollDown()} className="carousel-btn" aria-label='carousel-backward'>
                  <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
                </button>'
            </div>
        );
    }
}

export default MultiplayerGrid;