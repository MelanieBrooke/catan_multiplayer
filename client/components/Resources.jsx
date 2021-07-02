import React from 'react';
import style from './resources.modules.css';

const Resources = (props) => {
  return (<div>
    <table>
      <tbody>
        <tr>
          <td>
            <img  className={style.image} src='./images/sheep.jpg'></img>
          </td>
          <td>
            In Hand: {props.resources.sheep.user}
            <br></br>
            <button value="sheep" onClick={props.spend}>Spend Sheep</button>
          </td>
          <td>
            In Deck: {props.resources.sheep.deck}
            <br></br>
            <button value="sheep" onClick={props.draw}>Take Sheep</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>)

}

export default Resources;