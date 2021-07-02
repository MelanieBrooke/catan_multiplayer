const express = require('express');
const app = express();
const port = 1986;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const { newGame, draw, discard } = require('./cards.js');
const { users, addUser, addCard, removeCard, addDeck } = require('./user.js');
const {newResources,
  drawResource,
  spendResource,
  resources} = require('./resources');

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});

app.get('/start', (req, res) => {
  played.display = false;
  newGame();
  newResources();
  res.send('game started')
})

app.get('/cards', (req, res) => {
  var user = req.query.user;
  var card = draw();
  if (card) {
    addCard(user, card);
  }
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

app.get('/resource', (req, res) => {
  var resource = req.query.resource;
  var user = req.query.user;
  if (resources[resource] === 0) {
    res.send('empty')
  }
  drawResource(user, resource);
  res.send(resource);
})

app.post('/resource', (req, res) => {
  var resource = req.body.resource;
  var user = req.body.user;
  spendResource(user, resource);
  res.send(resource);
})

app.get('/resources', (req, res) => {
  var user = req.query.user;
  if (!users[user]) {
    addUser(user);
  }
  res.send({
    user:{
      sheep: users[user].sheep,
      lumber: users[user].lumber,
      brick: users[user].brick,
      wheat: users[user].wheat,
      ore: users[user].ore
    },
    deck:resources
  })
})