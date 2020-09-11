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
    randomCard(removed = true) {
        const rand = Math.floor(Math.random() * (this.cards.length-1));
        const card = this.cards.splice(rand,1)[0]
        if (removed) {
            this.removedCards.push(card);
        }
        return card;
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

// function to deal cards in pyramid shape
function dealCards() {
    cardsInPlay = [];
    for (let i = 0; i < 7; i++) {
        cardsInPlay.push([]);
        const row = document.createElement('div')
        row.classList.add(`row-${i+1}`);
        document.querySelector('body').appendChild(row);
        for (let j = 0; j <= i; j++) {
            cardsInPlay[i].push(deck.randomCard());
            const placeHolderDiv = document.createElement('div');
            placeHolderDiv.classList.add('image');
            const newCard = document.createElement('img');
            newCard.src = cardsInPlay[i][j].path;
            placeHolderDiv.append(newCard);
            row.appendChild(placeHolderDiv);
        }
    }
    const randomDeck = [];
    for (let i = deck.cards.length; i > 0; i--) {
        randomDeck.push(deck.randomCard(false));
    }
    deck.cards = randomDeck;
}
dealCards();

function addListeners() {
    for (let i = 0; i < cardsInPlay.length; i++) {
        for (let j = 0; j < cardsInPlay[i].length; j++) {
            if (i === cardsInPlay.length-1 && !(cardsInPlay[i][j] === -1)) {
                document.querySelectorAll(`.row-${i+1} img`)[j].addEventListener('click', selectCard);
            } else if (true) {}
        }
    }
}
addListeners();

function selectCard(event) {
    console.log(event.target.src);
    // event.target.remove();
    event.target.classList.add('selected');
    console.table(cardsInPlay);
    addListeners();
}
