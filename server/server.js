const express = require('express');
const app = express();
const port = 1986;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const { newGame, draw } = require('./cards.js');
const { users, addUser, addCard, removeCard, addDeck } = require('./user.js');
// const user = require('./user.js');

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});

app.get('/start', (req, res) => {
  newGame();
  res.send('game started')
})

app.get('/cards', (req, res) => {
  var user = req.query.user;
  var card = draw();
  // console.log('draw:', card, 'user: ', user);
  addCard(user, card);
  // console.log(users)
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
  // console.log('/hand', user, deck, users[user][deck]);
  // console.log('/hand', users.Someone.practiceDeck)
  res.send(users[user][deck]);
})
