import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp, faArrowDown} from "@fortawesome/free-solid-svg-icons";

const tiles = [
    [
      {id:1, value:`t7`, color:''},
      {id:2, value:`t1`, color:''},
      {id:3, value:`t1`, color:''},
      {id:4, value:`t1`, color:''},
      {id:5, value:`t1`, color:''}
    ],
    [
      {id:6, value:`t7`, color:''},
      {id:7, value:`t1`, color:''},
      {id:8, value:`t2`, color:''},
      {id:9, value:`t1`, color:''},
      {id:10, value:`t1`, color:''}
    ],
    [
      {id:11, value:`t7`, color:''},
      {id:12, value:`t1`, color:''},
      {id:13, value:`t3`, color:''},
      {id:14, value:`t1`, color:''},
      {id:15, value:`t1`, color:''}
    ],
    [
      {id:16, value:`t7`, color:''},
      {id:17, value:`t1`, color:''},
      {id:18, value:`t4`, color:''},
      {id:19, value:`t1`, color:''},
      {id:20, value:`t1`, color:''}
    ],
      [
      {id:21, value:`t7`, color:''},
      {id:22, value:`t1`, color:''},
      {id:23, value:`t5`, color:''},
      {id:24, value:`t1`, color:''},
      {id:25, value:`t1`, color:''}
    ],
    [
      {id:26, value:`t7`, color:''},
      {id:27, value:`t1`, color:''},
      {id:28, value:`t6`, color:''},
      {id:29, value:`t1`, color:''},
      {id:30, value:`t1`, color:''}
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

        this.state = {};
        this.playersRef = React.createRef();

        this.moveGrid = this.moveGrid.bind(this);
        
    }

    componentDidMount(){
      let scrollList = this.playersRef.current;
      let scrollSpeed = (scrollList.scrollHeight-scrollList.clientHeight)/ scrollList.clientHeight;
      scrollSpeed = Math.round(scrollSpeed);

      const scroll = () => {
        if(Math.round(scrollList.scrollHeight - scrollList.scrollTop) == scrollList.clientHeight){
          scrollList.scrollTo(0, 0);
        }else{
          scrollList.scrollBy(0,scrollSpeed);
        }
      };

      scrolldelay = setInterval(scroll,100);
    }

    moveGrid(direction){
      console.log("hello");
    }

    render(){
        return(
            <div class='multiplayer-carousel'>
                <button id='carousel-btn-forward' className = "carousel-btn" onClick={(n) => this.moveGrid('up')} aria-label='carousel-forward'>
                  <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
                </button>

                <ul ref={this.playersRef}>
                    {modelPlayers.map((player) => {
                      return (
                        <li className='player-card'>
                          <div className ="player-grid">
                            {player.grid.map((row) => {
                              return (
                                <div class="player-grid-row">
                                  {row.map((tile) => {
                                    return <div className="grid-circle" style={{background:tile}}></div>
                                  })}
                                </div>
                              )
                            })}
                          </div>
                          <div className="player-name">{player.name}</div>
                        </li>
                      )
                    })}
                </ul>
                <button id='carousel-btn-backward' onClick={() => this.moveGrid('down')} className="carousel-btn" aria-label='carousel-backward'>
                  <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
                </button>'
            </div>
        );
    }
}

export default MultiplayerGrid;