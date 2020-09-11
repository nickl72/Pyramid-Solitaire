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
    },
    removeCard(index) {
        const card = this.cards.splice(index,1);
        this.removedCards.push(card[0]);
        return card[0];
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
            newCard.attributes.row = i;
            newCard.attributes.rowIndex = j;
            newCard.attributes.card = cardsInPlay[i][j];
            placeHolderDiv.append(newCard);
            row.appendChild(placeHolderDiv);
        }
    }

    // randomizes remaining cards in the deck
    const randomDeck = [];
    for (let i = deck.cards.length; i > 0; i--) {
        randomDeck.push(deck.randomCard(false));
    }
    deck.cards = randomDeck;

    // Displays deck
    const displayedDeck = document.createElement('div')
    const flippedCard = document.createElement('img');
    const unflippedCard = document.createElement('img');
    unflippedCard.src = 'images/red_joker.png';
    unflippedCard.id= 'unflipped'
    displayedDeck.classList.add('deck');
    document.querySelector('body').appendChild(displayedDeck);
    displayedDeck.appendChild(unflippedCard);
    displayedDeck.appendChild(flippedCard);
    flippedCard.id = 'flipped-card';
    unflippedCard.classList.add('available')
    unflippedCard.addEventListener('click', flipCard);
}

dealCards();

// function to add event listeners to selectable cards
function addListeners() {
    for (let i = 0; i < cardsInPlay.length; i++) {
        for (let j = 0; j < cardsInPlay[i].length; j++) {
            let availableCard;
            if (i === cardsInPlay.length-1 && !(cardsInPlay[i][j] === -1)) {
                availableCard = document.querySelectorAll(`.row-${i+1} .image`)[j]
                availableCard.addEventListener('click', selectCard);
                availableCard.querySelector('img').classList.add('available');
            } else if (cardsInPlay[i+1][j] === -1 && cardsInPlay[i+1][j+1] === -1 && cardsInPlay[i][j] !== -1) {
                availableCard = document.querySelectorAll(`.row-${i+1} .image`)[j];
                availableCard.addEventListener('click', selectCard);
                availableCard.classList.add('available');   
            }
        }
    }
}

addListeners();

let cardSelected = false;
// function that is called when a card is selected
function selectCard(event) {
    const previouslySelected = document.querySelector('.selected');
    const me = event.target;
    if (!cardSelected) { // first selection action
        if (me.attributes.card.value === 13) { // check for king
            if (me.attributes.row === -2) { // check if king is in deck or in pyramid
                deckIndex--;
                deck.removeCard(deckIndex);
                deckIndex--;
                flipCard();
            } else { // removes king from pyramid
                const row = me.attributes.row;
                const rowIndex = me.attributes.rowIndex;
                cardsInPlay[row][rowIndex] = -1;
                me.remove();
            }
        } else { // selects clicked card
            me.classList.add('selected');
            cardSelected = true;
        }
        return;
    } else if (me.classList.contains('selected')) { // toggle card class
        me.classList.remove('selected');
        cardSelected = false;
        return;
    } else { // second card selection action
        cardSelected = false;
        previouslySelected.classList.remove('selected');
    }

    // quits checking if card selection is invalid
    if (previouslySelected.attributes.card.value + me.attributes.card.value !== 13) {
        return;
    }
    console.log(previouslySelected.attributes);
    const row = event.target.attributes.row;
    const rowIndex = event.target.attributes.rowIndex;
    cardsInPlay[row][rowIndex] = -1;
   
    event.target.classList.remove('available');
    // event.target.remove();
    if (cardsInPlay[0][0] === -1) {
        alert('WINNER!');
        return;
    }
    addListeners();
}

let deckIndex = -1;

function flipCard() {
    if (deckIndex === deck.cards.length - 2) {
        document.querySelector('#unflipped').src = '';
    } else if (deckIndex === deck.cards.length-1) {
        deckIndex = 0;
        document.querySelector('#unflipped').src = 'images/red_joker.png';
        document.querySelector('#flipped-card').src = '';
        return;
    }
    deckIndex++;
    
    const flipped = document.querySelector('#flipped-card');
    flipped.classList.add('available');
    flipped.addEventListener('click', selectCard);
    flipped.src = deck.cards[deckIndex].path;
    flipped.attributes.row = -2;
    flipped.attributes.rowIndex = -2
    flipped.attributes.card = deck.cards[deckIndex];

    console.log(deckIndex);
}
