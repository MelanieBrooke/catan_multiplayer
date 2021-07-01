const cards = require('./cards.js');
const {practiceDeck} = require('./decks.js');

const users = {};

const resetUsers = () => {
  for (var userName in users) {
    // console.log('userName', userName);
    // console.log('users[userName]', users[userName]);
    users[userName] = {};
  }
}

const addUser = (userName) => {
  users[userName] = {}
  // user.push(userInfo);
}

const addDeck = (user, deck) => {
  if (!users[user][deck]) {
    users[user][deck] = [];
  }
}

const addCard = (name, card, deck='practiceDeck') => {
  if (!users[name]) {
    addUser(name);
  }
  if (!users[name][deck]) {
    users[name][deck] = [];
  }
  console.log('users[name][deck]:', users[name][deck])
  users[name][deck].push(card);
}

const removeCard = (name, card, deck='practiceDeck') => {
  var cardIndex = users[name][deck].indexOf(card);
  users[name][deck].splice(cardIndex, 1);
}

module.exports = {
  users,
  addUser,
  addCard,
  removeCard,
  addDeck,
  resetUsers
}