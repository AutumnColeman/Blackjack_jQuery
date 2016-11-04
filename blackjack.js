$(document).ready(function() {
  var dealerHand = [];
  var playerHand = [];
  var deck = newDeck();
  shuffle(deck);


  $('#deal-button').click(function() { //Deals inital cards
    // dealCards(deck);
    dealCards(deck, '#player-hand', '#player-points', playerHand);
    dealCards(deck, '#player-hand', '#player-points', playerHand);
    dealCards(deck, '#dealer-hand', '#dealer-points', dealerHand);
    dealCards(deck, '#dealer-hand', '#dealer-points', dealerHand);
    console.log(playerHand);
    console.log(dealerHand);
  });

  $('#hit-button').click(function () { //Hit me!  Gives player additional card/s
    dealCards(deck, '#player-hand', '#player-points', playerHand);
    $('#player-points').text(calculatePoints(playerHand));
    var total = calculatePoints(playerHand);
    if (total > 21) {
      console.log(total);
      $('#messages').text('Bust');
      $('#deal-button').prop('disabled', true);
      $('#hit-button').prop('disabled', true);
    }
    var total2 = calculatePoints(dealerHand);
    if (total2 > 21) {
      console.log(total);
      $('#messages').text('Dealer busts');
    }
  });

  $('#stand-button').click(function () {
    $('#deal-button').prop('disabled', true);
    $('#hit-button').prop('disabled', true);
    var dealerTotal = calculatePoints(dealerHand);
    var playerTotal = calculatePoints(playerHand);
    if (dealerTotal < playerTotal && dealerTotal < 21) {
      dealCards(deck, '#dealer-hand', '#dealer-points', dealerHand);
    }
  });



  // function shuffle(deck){
  //
  // }


  function dealCards(deck, handHolder, handPoints, handHolderArr) { //puns for days
    var card = deck.pop();
    handHolderArr.push(card);
    $(handHolder).append('<img class="card" src="' + getCardImageUrl(card) + '">');
    $(handPoints).text(calculatePoints(handHolderArr));
  }

  function shuffle(deck) {  //shuffles the deck
   var currentIndex = deck.length, temporaryValue, randomIndex;

   // While there remain elements to shuffle...
   while (0 !== currentIndex) {

     // Pick a remaining element...
     randomIndex = Math.floor(Math.random() * currentIndex);
     currentIndex -= 1;

     // And swap it with the current element.
     temporaryValue = deck[currentIndex];
     deck[currentIndex] = deck[randomIndex];
     deck[randomIndex] = temporaryValue;
   }

   return deck;
  }



  // function bust(sum) {
  //   var total = calculatePoints(hand);
  //   if (total > 21) {
  //     $('#message').append('You busted sucka!');
  //   } else {
  //     return;
  //   }
  // }

  function getCardImageUrl(card) {  //renders the image name of the cards
    var name = card.point;
      if (card.point === 11) {
        name = 'jack';
    } else if (card.point === 12) {
      name = 'queen';
    } else if (card.point === 13) {
      name = 'king';
    } else if (card.point === 1) {
      name = 'ace';

    }
    return 'images/' + name + '_of_' + card.suit + '.png';
  }

  function calculatePoints(hand) { //calculates the points for a hand
    var arr = hand;
    var combine = function(a, b) {
      // console.log('a=', a, 'b=', b); for testing
      return a + b.point;
    };
    var sum = arr.reduce(combine, 0);
    return sum;
  }

  function newDeck() {  //generates the deck
   var deck = [];
   var suits = ['spades', 'hearts', 'clubs', 'diamonds'];
   for (var i = 1; i <= 13; i++) {
     for (var j = 0; j <= 3; j++) {
       deck.push({'point': i, 'suit': suits[j]});
     }
   }
   return deck;
  }

});
