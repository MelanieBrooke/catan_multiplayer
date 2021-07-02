import React from 'react';
import axios from 'axios';
import Cards from './Cards.jsx';
import Hand from './Hand.jsx';
import Played from './Played.jsx';
import played from './played.modules.css';
import app from './app.modules.css';
import Drawn from './Drawn.jsx';
import Resources from './Resources.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      hand: [],
      cardDisplay: false,
      userClosed: false,
      discard: {user: null, card: null},
      drawDisplay: false,
      drawn: null,
      resources: {
        sheep: {deck: 0, user: 0},
        lumber: {deck: 0, user: 0},
        brick: {deck: 0, user: 0},
        wheat: {deck: 0, user: 0},
        ore: {deck: 0, user: 0},
      }
    };
    this.draw = this.draw.bind(this);
    this.restart = this.restart.bind(this);
    this.discard = this.discard.bind(this);
    this.checkForUpdates = this.checkForUpdates.bind(this);
    this.displayCardToPlayers = this.displayCardToPlayers.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.drawResource = this.drawResource.bind(this);
    this.spendResource = this.spendResource.bind(this);
  };

  componentDidMount() {
    let name = window.location.search;
    name = name.split('=');
    name = name[1];
    axios.get('/hand', {
      params: {
        user: name,
        deck: 'catanDevelopmentDeck'
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
    this.checkForUpdates = this.checkForUpdates.bind(this);
    setInterval(this.checkForUpdates, 1000);
  }

  drawResource(e) {
    var resource = e.target.value;
    axios.get('/resource', {params: {
      resource:resource,
      user: this.state.user}
    })
    .then(response => {
      this.checkForUpdates();
    })
  }

  spendResource(e) {
    var r = e.target.value;
    axios.post('/resource', {
      resource:r,
      user: this.state.user
    })
    .then(response => {
      this.checkForUpdates();
    })
  }

  seeResources() {
    axios.get('/resources', {params: {
      user:this.state.user
    }})
    .then(response => {
      // console.log('get hand response', response.data);
      this.setState({
        resources:{
          sheep:{user:response.data.user.sheep, deck:response.data.deck.sheep},
          lumber:{user:response.data.user.lumber, deck:response.data.deck.lumber},
          brick:{user:response.data.user.brick, deck:response.data.deck.brick},
          wheat:{user:response.data.user.wheat, deck:response.data.deck.wheat},
          ore:{user:response.data.user.ore, deck:response.data.deck.ore},
        }
      })
    })
  }

  displayCardToPlayers(card, user) {
    console.log('display card to players')
    this.setState({
      cardDisplay: true,
      discard: {
        user: user,
        card: card
      }
    });
    setTimeout(() => {
      console.log('set Timeout function');
      axios.post('/hide');
      this.setState({
        cardDisplay: false,
        userClosed: false
      })
    }, 5000);
  }

  discard(card) {
    axios.post('/discard', {
      card: card,
      user: this.state.user
    })
    .then(response => {
      console.log(response);
      this.checkForUpdates();
      this.displayCardToPlayers(card, this.state.user);

    })
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
        user: this.state.user
      }}
    )
    .then(card => {
      if (!card.data) {
        console.log('There are no cards left!');
        return;
      } else {
        this.state.hand.push(card.data);
        this.setState({
          hand: this.state.hand,
          drawDisplay: true,
          drawn: card.data
        })
      }
    })
  }

  // until I learn sockets
  checkForUpdates() {
    this.seeResources();
    // console.log('called');
    axios.get('/played')
    .then(results => {
      if (this.state.userClosed === true) {
        this.setState({
          cardDisplay: false
        });
      } else {
        this.setState({
          cardDisplay: results.data.display,
          discard: {
            user: results.data.user,
            card: results.data.card
          }
        })
      }
    })
    axios.get('/hand', {
      params: {
        user: this.state.user,
        deck: 'catanDevelopmentDeck'
      }
    })
    .then(handCards => {
      this.setState({
        user: this.state.user,
        hand: handCards.data
      })
    })
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      cardDisplay: false,
      userClosed: true
    });
    setTimeout(() => {
      this.setState({
        userClosed: false
      })
    }, 5000);
  }

  handleClose(e) {
    e.preventDefault();
    this.setState({
      drawDisplay: false
    })
  }

  render() {
    return(
      <div className={played.body}>
        <Played
        cardDisplay={this.state.cardDisplay}
        playedBy={this.state.discard.user}
        cardPlayed={this.state.discard.card}
        handleClick={this.handleClick}
        />
        <Drawn
        drawDisplay={this.state.drawDisplay}
        handleClose={this.handleClose}
        cardDrawn={this.state.drawn}
        />
        <h1>Settlers of Catan Development Card Tracker</h1>
        <br></br>
        <br></br>
        <h3>Welcome, {this.state.user}</h3>
        <button onClick={this.restart}>Reset Deck</button>
        <br></br>
        <br></br>
        <Cards draw={this.draw}/>
        <br></br>
        <br></br>
        <div className={app.img}>
          <Resources
          resources={this.state.resources}
          draw={this.drawResource}
          spend={this.spendResource}
          />
          <Hand cards={this.state.hand} discard={this.discard}/>
        </div>
      </div>
    );
  }


}

export default App;