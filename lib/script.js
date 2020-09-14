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

class Undo {
    constructor(card,row, index) {
        this.card = card;
        this.row = row;
        this.index = index;
    }
}

const undoArr = [];

const deck = {
    cards: [],
    removedCards: [],
    randomCard(removed = true) {
        const rand = Math.floor(Math.random() * (this.cards.length));
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
    deck.removedCards = [];
    const suits = ['spades','hearts','clubs','diamonds'];
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j <= 13; j++) {
            deck.cards.push(new Card(j,suits[i]));

        }
    }
};


// function to deal cards in pyramid shape
function dealCards() {
    document.querySelector('section').innerHTML ='';
    cardsInPlay = [];
    for (let i = 0; i < 7; i++) {
        cardsInPlay.push([]);
        const row = document.createElement('div')
        row.classList.add(`row-${i+1}`, 'row');
        document.querySelector('section').appendChild(row);
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
    document.querySelector('section').appendChild(displayedDeck);
    displayedDeck.appendChild(unflippedCard);
    displayedDeck.appendChild(flippedCard);
    flippedCard.id = 'flipped-card';
    unflippedCard.classList.add('available')
    unflippedCard.addEventListener('click', flipCard);
}


// function to add event listeners to selectable cards
function addListeners() {
    for (let i = 0; i < cardsInPlay.length; i++) {
        for (let j = 0; j < cardsInPlay[i].length; j++) {
            let availableCard = document.querySelectorAll(`.row-${i+1} .image`)[j];
            if (i === cardsInPlay.length-1) {
                if (!(cardsInPlay[i][j] === -1)) {
                    availableCard.addEventListener('click', selectCard);
                    availableCard.querySelector('img').classList.add('available');
                } else {
                    availableCard.removeEventListener('click',selectCard);
                }
            } else if (cardsInPlay[i+1][j] === -1 && cardsInPlay[i+1][j+1] === -1 && cardsInPlay[i][j] !== -1) {
                availableCard.addEventListener('click', selectCard);
                availableCard.classList.add('available');   
            } else {
                availableCard.removeEventListener('click',selectCard);
                availableCard.classList.remove('available');
            }
        }
    }
}



// function that is called when a card is selected
function selectCard(event) {
    const previouslySelected = document.querySelector('.selected');
    const me = event.target;
    if (!cardSelected) { // first selection action
        if (me.attributes.card.value === 13) { // check for king
            if (me.attributes.row === -2) { // check if king is in deck or in pyramid
                undoArr.push(new Undo (deck.cards[deckIndex], -2, deckIndex));
                deck.removeCard(deckIndex);
                deckIndex-=2;
                flipCard();
            } else { // removes king from pyramid
                const row = me.attributes.row;
                const rowIndex = me.attributes.rowIndex;
                undoArr.push(new Undo (cardsInPlay[row][rowIndex],row,rowIndex));
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





   if (previouslySelected.attributes.row === -2) {
        undoArr.push(new Undo (deck.cards[deckIndex],-2,deckIndex));
        deck.removeCard(deckIndex);
        deckIndex-=2;
        flipCard();
   } else {
        const prevRow = previouslySelected.attributes.row;
        const prevRowIndex = previouslySelected.attributes.rowIndex;
        undoArr.push(new Undo (cardsInPlay[prevRow][prevRowIndex],prevRow,prevRowIndex));
        cardsInPlay[prevRow][prevRowIndex] = -1;
        previouslySelected.remove();
   }

   if (me.attributes.row == -2) {
        undoArr.push(new Undo (deck.cards[deckIndex,-2,deckIndex]));
        deck.removeCard(deckIndex);
        deckIndex-=2;
        flipCard();
   } else {
    const row = me.attributes.row;
    const rowIndex = me.attributes.rowIndex;
    undoArr.push(new Undo (cardsInPlay[row][rowIndex],row,rowIndex));
    cardsInPlay[row][rowIndex] = -1;
    me.remove();

   }

    me.classList.remove('available');

    // checks if player has won
    if (cardsInPlay[0][0] === -1) {
        const section = document.querySelector('section');
        section.innerHTML = '';
        section.append(document.createElement('h3').innerText = 'WINNER!');
        return;
    }
    addListeners();
}



function flipCard() {
    const flipped = document.querySelector('#flipped-card'); 
    if (flipped.classList.contains('selected')) {
        cardSelected = false;
        flipped.classList.remove('selected');
    }
    if (deckIndex < -1) {
        deckIndex = -1;
        document.querySelector('#flipped-card').src = '';
        return;
    };
    if (deckIndex === deck.cards.length - 2) {
        document.querySelector('#unflipped').src = '';
    } else if (deckIndex === deck.cards.length-1) {
        deckIndex = -1;
        document.querySelector('#unflipped').src = 'images/red_joker.png';
        document.querySelector('#flipped-card').src = '';
        return;
    }
    deckIndex++;
    
   
    flipped.classList.add('available');
    flipped.addEventListener('click', selectCard);
    flipped.src = deck.cards[deckIndex].path;
    flipped.attributes.row = -2;
    flipped.attributes.rowIndex = -2
    flipped.attributes.card = deck.cards[deckIndex];
}


let cardSelected = false;
let deckIndex = -1;
resetGame();
function resetGame() {
    document.querySelectorAll('.row, .deck').forEach(div => {
        div.remove();
    })
    buildDeck();
    dealCards();
    addListeners();
}
document.querySelector('#reset-game').addEventListener('click', function(event) {
    event.preventDefault();
    resetGame();
});




document.querySelector('#undo').addEventListener('click', undoMove);

function undoMove() {
    // alert('Undo not yet available');
    const lastCard = undoArr.length-1;
    if (undoArr[lastCard].card.value === 13) {
        if (undoArr[lastCard].row === -2) {
            console.table(deck.cards);
            console.table(undoArr);
            deck.cards.splice(undoArr[lastCard].index,0,undoArr[lastCard].card);
            undoArr.pop()
            console.table(deck.cards);
            console.table(undoArr);
        }
    }
    // console.table(cardsInPlay);
    // console.log(undoArr);
    addListeners();
};
