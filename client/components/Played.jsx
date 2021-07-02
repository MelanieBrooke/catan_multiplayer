import React from 'react';
import played from './played.modules.css';

const Played = (props) => {
  if (props.cardDisplay === false) {
    return (<div></div>);
  } else {
    return (
      <div className={played.bg}>
        <div className={played.content_box}>
        <span class={played.close} onClick={props.handleClick}>&times;</span>
        {props.cardPlayed} was discarded by {props.playedBy}
        </div>
      </div>
    )
  }
}

export default Played;