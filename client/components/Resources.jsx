import React from 'react';
import style from './resources.modules.css';

const Resources = (props) => {
  // var total = 0;
  // console.log(typeof props.resources.sheep.user)
  var total = Number(props.resources.sheep.user) + Number(props.resources.lumber.user) + Number(props.resources.brick.user) + Number(props.resources.wheat.user) + Number(props.resources.ore.user);
  return (<div className={style.development}>
    <table>
      <thead>
        <th><h3>Resource Cards:</h3></th>
        <th><h3>{total}</h3></th>
      </thead>
      <tbody>
        <tr>
          <td>
            <img  className={style.image} src='./images/sheep.jpg'></img>
          </td>
          <td>
            In Hand: {props.resources.sheep.user}
            <br></br>
            <button value="sheep" onClick={props.spend}>Spend Sheep</button>
            <br></br>
            <br></br>
            In Deck: {props.resources.sheep.deck}
            <br></br>
            <button value="sheep" onClick={props.draw}>Take Sheep</button>
          </td>
        </tr>
        <tr>
          <td>
            <img  className={style.image} src='./images/lumber.jpg'></img>
          </td>
          <td>
            In Hand: {props.resources.lumber.user}
            <br></br>
            <button value="lumber" onClick={props.spend}>Spend Lumber</button>
            <br></br>
            <br></br>
            In Deck: {props.resources.lumber.deck}
            <br></br>
            <button value="lumber" onClick={props.draw}>Take Lumber</button>
          </td>
        </tr>
        <tr>
          <td>
            <img  className={style.image} src='./images/brick.jpg'></img>
          </td>
          <td>
            In Hand: {props.resources.brick.user}
            <br></br>
            <button value="brick" onClick={props.spend}>Spend Brick</button>
            <br></br>
            <br></br>
            In Deck: {props.resources.brick.deck}
            <br></br>
            <button value="brick" onClick={props.draw}>Take Brick</button>
          </td>
        </tr>
        <tr>
          <td>
            <img  className={style.image} src='./images/wheat.jpg'></img>
          </td>
          <td>
            In Hand: {props.resources.wheat.user}
            <br></br>
            <button value="wheat" onClick={props.spend}>Spend Wheat</button>
            <br></br>
            <br></br>
            In Deck: {props.resources.wheat.deck}
            <br></br>
            <button value="wheat" onClick={props.draw}>Take Wheat</button>
          </td>
        </tr>
        <tr>
          <td>
            <img  className={style.image} src='./images/ore.jpg'></img>
          </td>
          <td>
            In Hand: {props.resources.ore.user}
            <br></br>
            <button value="ore" onClick={props.spend}>Spend Ore</button>
            <br></br>
            <br></br>
            In Deck: {props.resources.ore.deck}
            <br></br>
            <button value="ore" onClick={props.draw}>Take Ore</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>)

}

export default Resources;