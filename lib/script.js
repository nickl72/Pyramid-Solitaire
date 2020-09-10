class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
        switch (value) {
            case 1: this.name = 'ace'; break;
            case 13: this.name = 'king'; break;
            case 12: this.name = 'queen'; break;
            case 11: this.name = 'jack'; break;
            default: this.name = String(value);
        }
    }
}

let deck;

function buildDeck() {
    deck = [];
    const suits = ['spades','hearts','clubs','diamonds'];
for (let i = 0; i < 4; i++) {
    for (let j = 1; j <= 13; j++) {
        deck.push(new Card(j,suits[i]));
    }
}
};
buildDeck();
console.table(deck);