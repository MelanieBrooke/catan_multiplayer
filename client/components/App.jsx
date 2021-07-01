import React from 'react';
import axios from 'axios';
import Cards from './Cards.jsx';
import Hand from './Hand.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      hand: []
    };
    this.draw = this.draw.bind(this);
    this.restart = this.restart.bind(this);
  };

  componentDidMount() {
    let name = window.location.search;
    name = name.split('=');
    name = name[1];
    axios.get('/hand', {
      params: {
        user: name,
        deck: 'practiceDeck'
      }
    })
    .then(handCards => {
      this.setState({
        user: name,
        hand: handCards.data
      })
      return this.state;
    })
    .then(state => {
      console.log('this.state???', state)
    })
    // setInterval(this.checkForUpdates(), 5000);
  }

  restart() {
    this.setState({
      hand: []
    });
    axios.get('/start')
    .then(res => {
      console.log('component did mount', res.data);
    });
  }

  draw() {
    axios.get('/cards',
      {params: {
        user: this.state.user,
      }}
    )
    .then(card => {
      if (!card.data) {
        console.log('There are no cards left!');
        return;
      } else {
        // console.log('card:', card.data);
        this.state.hand.push(card.data);
        this.setState({
          hand: this.state.hand
        })
      }
    })
  }

  // until I learn sockets
  checkForUpdates() {
    console.log('called');
    axios.get('/hand', {
      params: {
        user: this.state.user,
        deck: 'practiceDeck'
      }
    })
    .then(handCards => {
      this.setState({
        user: this.state.user,
        hand: handCards.data
      })
    })
  }

  render() {
    return(
      <div>
        <h1>Card Deck Drawing App Thingy</h1>
        <br></br>
        <br></br>
        <h3>Welcome, {this.state.user}</h3>
        <button onClick={this.restart}>Reset Deck</button>
        <br></br>
        <br></br>
        <Cards draw={this.draw}/>
        <br></br>
        <br></br>
        <Hand cards={this.state.hand}/>
      </div>
    );
  }


}

export default App;