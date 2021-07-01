const {resetUsers} = require('./user.js');
const { practiceDeck } = require('./decks.js');

var tempDeck = [];

const newGame = (deck=practiceDeck) => {
  var gameDeck = deck.slice();
  tempDeck = shuffle(gameDeck);
  resetUsers();
}

const shuffle = (deck) => {
  var currentIndex = deck.length,  randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [deck[currentIndex], deck[randomIndex]] = [
      deck[randomIndex], deck[currentIndex]];
  }
  return deck;
}

const pile = (deck) => {
  // console.log(deck)
  return deck.length;
}

const draw = (deck=tempDeck) => {
  // draw top card (first in array)
  if (pile(deck)) {
    let drawn = deck[0];
    deck.shift();
    return drawn;
  } else {
    console.log('deck empty');
  }
}

const discard = (deck, card) => {
  // put card back on bottom of deck
  deck.push(card);
}

module.exports = {
  tempDeck,
  newGame,
  shuffle,
  draw,
  discard
}