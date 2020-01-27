let container = document.getElementById('container');
let totalNum = 3;
let cards = [];
let cardsSelected = 0;
let firstCard = null;
let secondCard = null;
let pairNum = 0;

function drawCards(numMax) {
  for (let i = 1; i <= numMax; i++) {
    let card1 = createCard(i);
    let card2 = createCard(i);
    cards.push(card1);
    cards.push(card2);
  }
  shuffleArray(cards);
  cards.forEach(function(card) {
    container.appendChild(card);
  });
}

function onClick(event) {
  // Si hubo un juego limpio lo pasado
  if (firstCard && secondCard) {
    firstCard.classList.remove('selected');
    secondCard.classList.remove('selected');
    firstCard = null;
    secondCard = null;
  }
  // Aumento el contador
  cardsSelected++;

  let clickedCard = event.target;
  clickedCard.classList.add('selected');

  if (cardsSelected === 1) {
    // Guardar la primera carta
    firstCard = clickedCard;
  }
  if (cardsSelected === 2) {
    // Comparo las 2
    secondCard = clickedCard;
    if (firstCard === secondCard) {
      firstCard.classList.remove('selected');
      secondCard.classList.remove('selected');
      firstCard = null;
      secondCard = null;
      cardsSelected = 0;
      return;
    }
    let num1 = firstCard.innerHTML;
    let num2 = secondCard.innerHTML;
    if (num1 === num2) {
      console.log('son iguales');
      firstCard.removeEventListener('click', onClick);
      secondCard.removeEventListener('click', onClick);
      firstCard = null;
      secondCard = null;
      pairNum++;
      if (pairNum === totalNum) {
        console.log('gano!');
        let message = document.getElementById('message');
        message.classList.add('win');
        container.classList.add('win');
      }
    } else {
      console.log('son diferentes');
    }
    cardsSelected = 0;
  }
}

function createCard(num) {
  let card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = num;
  card.addEventListener('click', onClick);
  return card;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

drawCards(totalNum);
