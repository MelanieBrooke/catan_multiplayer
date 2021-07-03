import React from 'react';
import DisplayHand from './DisplayHand.jsx';
import style from './resources.modules.css';

const Hand = (props) => {
  return (
    <div className={style.development}>
      <h3>Development Cards: {props.cards.length}</h3>
      {/* {props.cards} */}
      <ul>{props.cards.map(card =>
        <DisplayHand card={card} discard={props.discard}/>
      )}</ul>
    </div>
  );
}

export default Hand;