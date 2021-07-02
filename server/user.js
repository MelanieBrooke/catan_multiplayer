const cards = require('./cards.js');
const {alphabetDeck, catanDevelopmentDeck} = require('./decks.js');

const users = {};

const resetUsers = () => {
  for (var userName in users) {
    users[userName] = {};
  }
}

const addUser = (userName) => {
  users[userName] = {}
}

const addDeck = (user, deck) => {
  if (!users[user][deck]) {
    users[user][deck] = [];
  }
}

const addCard = (name, card, deck='catanDevelopmentDeck') => {
  if (!users[name]) {
    addUser(name);
  }
  if (!users[name][deck]) {
    users[name][deck] = [];
  }
  users[name][deck].push(card);
}

const removeCard = (name, card, deck='catanDevelopmentDeck') => {
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