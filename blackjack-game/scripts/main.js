window.addEventListener('DOMContentLoaded', function() {
  // Execute after page load

  var startingDeck =[];
  var dealerHand = [];
  var playerHand = [];
  var playerScore = 0;
  var dealerScore = 0;

  createDeck();
  shuffleDeck();
  document.getElementById('hit-button').disabled = true
  document.getElementById('stand-button').disabled = true;

  document.getElementById('deal-button').addEventListener('click',dealDeck);
  document.getElementById('hit-button').addEventListener('click',hitMeButton);
  document.getElementById('stand-button').addEventListener('click',playerStand);
  document.getElementById('reset-button').addEventListener('click',resetGame);


  function dealDeck() {
    document.getElementById('hit-button').disabled = false
    document.getElementById('stand-button').disabled = false;
    for(let index = 0; index < 4; index++) {
      let tempCard = startingDeck[index];

       let tempCardImg = getCardImage(tempCard);

      if(index == 0 || index == 2) {
        document.getElementById('player-hand').appendChild(tempCardImg);
        playerHand.push(tempCard)
        console.log(tempCard);

      } else  {
        document.getElementById('dealer-hand').appendChild(tempCardImg);
        dealerHand.push(tempCard);
        console.log(tempCard);
      }
      startingDeck.shift();
    }
    calculatePlayerPoints();
    calculateDealer();

    if(playerScore == 21 ||dealerScore == 21 ) {
      document.getElementById('hit-button').disabled = true
      document.getElementById('stand-button').disabled = true;
      determineWinner();
    }
    console.log(startingDeck.length)
    document.getElementById('deal-button').disabled = true
  }

  function getCardImage(card) {
    const tempImage = "/images/" + card.rank +"_of_" + card.suits + ".png";
    const newCardImage = document.createElement('img');
    newCardImage.src = tempImage;
    return newCardImage;
  }


  function hitMeButton() {
    if(playerHand.length <=4 && playerScore <=21) {
      const tempCard = startingDeck[0];
      const tempCardImg = getCardImage(tempCard);
      document.getElementById('player-hand').appendChild(tempCardImg);
      playerHand.push(tempCard)
      startingDeck.shift()
      calculatePlayerPoints();
      if(playerScore > 21) {
        document.getElementById('hit-button').disabled = true
        calculatePlayerPoints();
        calculateDealer();
        alertBust()
      }
    } else {
      document.getElementById('hit-button').disabled = true
      calculatePlayerPoints();
      alertBust()
    }
  }

  function alertBust() {
    document.getElementById('messages').append('BUST');
    document.getElementById('messages').append(' - ');
    document.getElementById('messages').append('Dealer WINS');

  }

  function createDeck() {
    const suits =['hearts','clubs','diamonds','spades'];
    const ranks = ['2','3','4','5','6','7','8','9','10','jack','queen','king','ace'];
    let card;
    for(let i = 0;i < 4;i++) {
      for(let r = 0; r < 13;r++) {
        card = {
          rank: ranks[r],
          suits: suits[i]
        };
        startingDeck.push(card);
      }
    }
  }

  function shuffleDeck() {
    for(let i = 0; i < 52; i++) {
      let tempCard = startingDeck[i];
     let randomIndex = Math.floor(Math.random() * 52)
     startingDeck[i] = startingDeck[randomIndex];
     startingDeck[randomIndex] = tempCard;
    }
  }

  function calculatePlayerPoints() {
    playerScore =0
    for(let index = 0 ; index < playerHand.length; index ++) {
      if(playerHand[index].rank == 'jack' ||
      playerHand[index].rank == 'queen' || 
      playerHand[index].rank == 'king' ) {
        playerScore += 10;
      } else if (playerHand[index].rank == 'ace') {
        playerScore += 11;
      } else  {
        playerScore += parseInt(playerHand[index].rank, 10);
      }
    }
    document.getElementById('player-points').append(`${playerScore}`);
  }

  function calculateDealer() {
    dealerScore =0
    for(let index = 0 ; index < dealerHand.length; index ++) {
      if(dealerHand[index].rank == 'jack' ||
      dealerHand[index].rank == 'queen' || 
      dealerHand[index].rank == 'king' ) {
        dealerScore += 10;
      } else if (dealerHand[index].rank == 'ace') {
        dealerScore += 11;
      } else  {
        dealerScore += parseInt(dealerHand[index].rank, 10);
      }
    }
    document.getElementById('dealer-points').append(`${dealerScore}`);
  }

  function playerStand() {
    document.getElementById('hit-button').disabled = true
    document.getElementById('stand-button').disabled = true;
    if(dealerScore >= 17) {
      determineWinner();
      return;
    } else {
      while(dealerHand.length <=4 && dealerScore <=21) {
        const tempCard = startingDeck[0];
        const tempCardImg = getCardImage(tempCard);
        document.getElementById('dealer-hand').appendChild(tempCardImg);
        dealerHand.push(tempCard)
        startingDeck.shift()
        calculateDealer();
        if(dealerScore >= 17) {
          determineWinner();
          return;
        }
      }
    }

  }

  function determineWinner() {
    if(playerScore > dealerScore && playerScore <=21) {
      document.getElementById('messages').append('Player WINS');
    } else if(dealerScore > 21 && playerScore <= 21) {
      document.getElementById('messages').append('Player WINS');
    } else if(playerScore == dealerScore) {
      document.getElementById('messages').append('TIE');
    } else {
      document.getElementById('messages').append('Dealer WINS');
    }
  }

  function resetGame() {
     startingDeck =[];
     dealerHand = [];
     playerHand = [];
     playerScore = 0;
     dealerScore = 0;
     document.getElementById('deal-button').disabled = false
     document.getElementById('player-hand').innerHTML('');
     document.getElementById('dealer-hand').innerHTML('');

  }
  
});




