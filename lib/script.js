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
