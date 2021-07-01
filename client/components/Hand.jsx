import React from 'react';
import DisplayHand from './DisplayHand.jsx';

const Hand = (props) => {
  return (
    <div>
      Cards:
      {/* {props.cards} */}
      <ul>{props.cards.map(card =>
        <DisplayHand card={card} />
      )}</ul>
    </div>
  );
}

export default Hand;