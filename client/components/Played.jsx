import React from 'react';
import played from './played.modules.css';

const Played = (props) => {
  if (props.cardDisplay === false) {
    return (<div></div>);
  } else {
    var cardText = props.cardPlayed.split('.');
    cardText = cardText[1].split('/');
    cardText = cardText[2];
    // console.log(cardText);
    return (
      <div className={played.bg}>
        <div className={played.content_box}>
        {/* <span class={played.close} onClick={props.handleClick}>&times;</span> */}
        <h3>{cardText} was discarded by {props.playedBy}</h3>
        <br></br>
        <img className={played.image} src={props.cardPlayed} alt={props.cardPlayed}></img>
        </div>
      </div>
    )
  }
}

export default Played;