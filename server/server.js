const express = require('express');
const app = express();
const port = 1986;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const { newGame, draw, discard } = require('./cards.js');
const { users, addUser, addCard, removeCard, addDeck } = require('./user.js');

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});

app.get('/start', (req, res) => {
  played.display = false;
  newGame();
  res.send('game started')
})

app.get('/cards', (req, res) => {
  var user = req.query.user;
  var card = draw();
  addCard(user, card);
  res.send(card);
})

app.get('/hand', (req, res) => {
  var user = req.query.user;
  var deck = req.query.deck;
  if (!users[user]) {
    addUser(user);
  }
  if (!users[user][deck]) {
    addDeck(user, deck)
  }
  res.send(users[user][deck]);
})

var played = {user: null, card: null, display: false}

app.get('/played', (req, res) => {
  var user = played.user;
  var card = played.card;
  var display = played.display;
  res.send({user:user, card:card, display:display})
})

app.post('/discard', (req, res) => {
  var card = req.body.card;
  var user = req.body.user;
  played = {user:user, card:card, display: true};
  discard(card);
  removeCard(user, card);
  res.send(card);
})

app.post('/hide', (req, res) => {
  played = {user:null, card:null, display: false}
})
