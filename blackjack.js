$(document).ready(function() {


  //Deck constructor
  function Deck() {
    this.cardArray = [];
    for (var i = 1; i <= 13; i++) {
      this.cardArray.push(new Card(i, 'diamonds'));
      this.cardArray.push(new Card(i, 'clubs'));
      this.cardArray.push(new Card(i, 'hearts'));
      this.cardArray.push(new Card(i, 'spades'));
    }
  }

  Deck.prototype.numOfCards = function() {
    return this.cardArray.length;
  };

  Deck.prototype.draw = function() {
    return this.cardArray.pop();
  };

  Deck.prototype.getCard = function(i) {
    return this.cardArray[i - 1];
  };

  Deck.prototype.shuffle = function() {
    for (var i = 0; i < this.cardArray.length; i++) {
      var rand = Math.floor(Math.random() * this.cardArray.length),
          rand2 = Math.floor(Math.random() * this.cardArray.length),
          temp;
      temp = this.cardArray[rand];
      this.cardArray[rand] = this.cardArray[rand2];
      this.cardArray[rand2] = temp;
    }
  };



  var dealerHand = new Hand();
  var playerHand = new Hand();
  var deck = new Deck();
  deck.shuffle();


  $('#deal-button').click(function() { //Deals inital cards
    // dealCards(deck);
    // dealCards(deck, '#player-hand', '#player-points', playerHand);
    dealCards(deck, '#player-hand', '#player-points', playerHand);
    dealCards(deck, '#dealer-hand', '#dealer-points', dealerHand);
    // dealCards(deck, '#dealer-hand', '#dealer-points', dealerHand);
    console.log(playerHand);
    console.log(dealerHand);
  });

  $('#hit-button').click(function () { //Hit me!  Gives player additional card/s
    dealCards(deck, '#player-hand', '#player-points', playerHand);
    $('#player-points').text(playerHand.calculatePoints());
    var total = playerHand.calculatePoints();
    if (total > 21) {
      console.log(total);
      $('#messages').text('Bust');
      $('#deal-button').prop('disabled', true);
      $('#hit-button').prop('disabled', true);
    }
    var total2 = dealerHand.calculatePoints();
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
    // if (dealerTotal < playerTotal && dealerTotal < 21) {
    //   dealCards(deck, '#dealer-hand', '#dealer-points', dealerHand);
    // }
  });



  // function shuffle(deck){
  //
  // }


  function dealCards(deck, handHolder, handPoints, handHolderArr) { //puns for days
    var card1 = deck.draw();
    var card2 = deck.draw();
    handHolderArr.addCard(card1);
    handHolderArr.addCard(card2);
    $(handHolder).append('<img class="card" src="' + card1.getImageUrl() + '">');
    $(handHolder).append('<img class="card" src="' + card2.getImageUrl() + '">');
    $(handPoints).text(handHolderArr.calculatePoints());
    console.log(handHolderArr.calculatePoints());
  }

  // function shuffle(deck) {  //shuffles the deck
  //  var currentIndex = deck.length, temporaryValue, randomIndex;

   // While there remain elements to shuffle...
  //  while (0 !== currentIndex) {
   //
  //    // Pick a remaining element...
  //    randomIndex = Math.floor(Math.random() * currentIndex);
  //    currentIndex -= 1;
   //
  //    // And swap it with the current element.
  //    temporaryValue = deck[currentIndex];
  //    deck[currentIndex] = deck[randomIndex];
  //    deck[randomIndex] = temporaryValue;
  //  }
  //
  //  return deck;
  // }



  // function bust(sum) {
  //   var total = calculatePoints(hand);
  //   if (total > 21) {
  //     $('#message').append('You busted sucka!');
  //   } else {
  //     return;
  //   }
  // }


// card constructor
function Card(point, suit) {
  this.point = point;
  this.suit = suit;
}

Card.prototype.getImageUrl = function() {
  var cardName = this.point;
  if(cardName == 11){
    cardName = "jack";
  }
  if(cardName == 12){
    cardName = "queen";
  }
  if(cardName == 13){
    cardName = "king";
  }
  if(cardName == 1){
    cardName = "ace";
  }
  return "images/" + cardName + "_of_" + this.suit + ".png";
};

//hand
function Hand() {
  this.hand = [];
}
Hand.prototype.addCard = function(card) { //adds card to array
  this.hand.push(card);
  this.hand.sort(function (a, b) {
    return b.point - a.point;
  });
};
Hand.prototype.calculatePoints = function() {  //calculates points for a hand
  var combine = function(sum, card) {
    var point = card.point;
    if (point === 11 || point === 12 || point === 13) {
      point = 10;
    }
    if (point === 1 && sum <= 10) {
      point = 11;
    }
    return sum + point;
  };
  return this.hand.reduce(combine, 0);
};
  // function newDeck() {  //generates the deck
  //  var deck = [];
  //  var suits = ['spades', 'hearts', 'clubs', 'diamonds'];
  //  for (var i = 1; i <= 13; i++) {
  //    for (var j = 0; j <= 3; j++) {
  //      deck.push(new Card(i, suits[j]));
  //    }
  //  }
  //  return deck;
  // }

  // function winner() {
  //   if (calculatePoints(playerHand) < 21 && (calculatePoints(playerHand) > (calculatePoints(dealerHand)) {
  //     $('#messages').text('Blackjack!');
  //   } else if ((calculatePoints(dealerHand) < 21 && (calculatePoints(dealerHand)) > (calculatePoints(playerHand)) {
  //     $('#messages').text('Dealer wins');
  //   }
  // }
});
// calculatePoints(playerHand);
