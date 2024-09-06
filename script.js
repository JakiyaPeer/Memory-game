const cardsArray = [
    { name: 'apple  ', id: 1 },
    { name: 'banana', id: 2 },
    { name: 'kiwi', id: 3 },
    { name: 'grapes', id: 4  },
    { name: 'cherry', id: 5 },
    { name: 'litchi', id: 6 },
    { name: 'mango', id: 7 },
    { name: 'grapes', id: 8  },
  

{ name: 'apple', id: 9 },
    { name: 'banana', id: 10 },
    { name: 'kiwi', id: 11 },
    { name: 'grapes', id: 12 },
    { name: 'cherry', id: 13 },
    { name: 'litchi', id: 14 },
    { name: 'mango', id: 16 },
    { name: 'grapes', id: 17  },

   
 

];

let gameBoard = document.getElementById('gameBoard');
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
    array.sort(() => 0.5 - Math.random());
}

function createBoard() {
    shuffle(cardsArray);
    cardsArray.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-name', card.name);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    this.classList.add('flip');
    this.innerText = this.getAttribute('data-name');
    
    if (!firstCard) {
        firstCard = this;
        return;
    }
    
    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.getAttribute('data-name') === secondCard.getAttribute('data-name');
    
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        firstCard.innerText = '';
        secondCard.innerText = '';
        
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function restartGame() {
    gameBoard.innerHTML = '';
    createBoard();
}

document.getElementById('restartButton').addEventListener('click', restartGame);

createBoard();
