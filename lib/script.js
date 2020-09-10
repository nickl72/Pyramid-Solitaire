// card array to store image path, card name, suit, and numerical value
class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
        switch (value) {
            case 1: this.name = 'ace'; this.path = `./images/${this.name}_of_${suit}.png`; break;
            case 13: this.name = 'king'; this.path = `./images/${this.name}_of_${suit}2.png`;break;
            case 12: this.name = 'queen'; this.path = `./images/${this.name}_of_${suit}2.png`; break;
            case 11: this.name = 'jack'; this.path = `./images/${this.name}_of_${suit}2.png`; break;
            default: this.name = String(value); this.path = `./images/${this.name}_of_${suit}.png`;
        }
    }
}

const deck = {
    cards: [],
    removedCards: [],
    randomCard() {
        const rand = Math.floor(Math.random() * (this.cards.length-1));
        this.removedCards.push(this.cards.splice(rand,1)[0]);
        console.table(this.cards);
        console.table(this.removedCards);

    }
};
let cardsInPlay;

// function to create a deck
function buildDeck() {
    deck.cards = [];
    const suits = ['spades','hearts','clubs','diamonds'];
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j <= 13; j++) {
            deck.cards.push(new Card(j,suits[i]));

        }
    }
};
buildDeck();

deck.randomCard();
// function to deal cards in pyramid shape
function dealCards() {
    cardsInPlay = [];
    for (let i = 0; i < 7; i++) {
        cardsInPlay.push([]);
        for (let j = 0; j < i; j++) {
            cardsInPlay[i].push()
        }
    }

}
