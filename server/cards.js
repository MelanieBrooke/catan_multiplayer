const {resetUsers} = require('./user.js');
const { alphabetDeck, catanDevelopmentDeck } = require('./decks.js');

var tempDeck = [];
var catanGameDeck = [];

const newGame = (deck=catanDevelopmentDeck) => {
  var gameDeck = deck.slice();
  if (deck=catanDevelopmentDeck) {
    catanGameDeck = shuffle(gameDeck);
  } else if (deck=alphabetDeck) {
    tempDeck = shuffle(gameDeck);
  }
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

const draw = (deck=catanGameDeck) => {
  // draw top card (first in array)
  if (pile(deck)) {
    let drawn = deck[0];
    deck.shift();
    return drawn;
  } else {
    console.log('deck empty');
  }
}

const discard = (card, deck=catanGameDeck) => {
  // put card back on bottom of deck
  deck.push(card);
}


module.exports = {
  tempDeck,
  catanGameDeck,
  newGame,
  shuffle,
  draw,
  discard
}