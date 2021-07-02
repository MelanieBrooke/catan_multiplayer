import React from 'react';

const DisplayHand = (props) => {
  return (
    // <li>{props.card}
    <li><img src={props.card} alt={props.card}></img>
    <br></br>
    <button onClick={()=>props.discard(props.card)}>Play/Discard</button>
    </li>
  )
}

export default DisplayHand;