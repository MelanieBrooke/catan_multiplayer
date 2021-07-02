import React from 'react';
import drawn from './drawn.modules.css';

const Drawn = (props) => {
  if (props.drawDisplay === false) {
    return (<div></div>)
  } else {
    var cardText = props.cardDrawn.split('.');
    cardText = cardText[1].split('/');
    cardText = cardText[2];
    return (
      <div className={drawn.bg}>
        <div className={drawn.content_box}>
        <span class={drawn.close} onClick={props.handleClose}>&times;</span>
        <h3>You drew {cardText}</h3>
        <br></br>
        <img className={drawn.image} src={props.cardDrawn} alt={props.cardDrawn}></img>
        </div>
      </div>
    )
  }
}

export default Drawn;