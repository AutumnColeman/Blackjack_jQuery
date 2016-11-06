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
  var dealerHand = new Hand();
  var playerHand = new Hand();
  var deck = new Deck();
  deck.shuffle();

//Dealing same total of cards for both players
  $('#deal-button').click(function() { //Deals inital cards
    // dealCards(deck);
    // dealCards(deck, '#player-hand', '#player-points', playerHand);
    dealCards(deck, '#player-hand', '#player-points', playerHand);
    dealCards(deck, '#dealer-hand', '#dealer-points', dealerHand);
    // dealCards(deck, '#dealer-hand', '#dealer-points', dealerHand);
  });

  $('#hit-button').click(function () { //Hit me!  Gives player additional card/s
    var card = deck.draw();
    playerHand.addCard(card);
    $('#player-hand').append('<img class="card" src="' + card.getImageUrl() + '">');
    $('#player-points').text(playerHand.calculatePoints());
    var total = playerHand.calculatePoints();
    if (total > 21) {
      console.log(total);
      $('#messages').text('Bust');
      $('#hit-button', '#stand-button').attr('disabled', true);
    }
    var total2 = dealerHand.calculatePoints();
    if (total2 > 21) {
      console.log(total);
      $('#messages').text('Dealer busts');
    }
  });

//Dealing same total of cards for both players.  look into while loop
  $('#stand-button').click(function () {
    $('#hit-button, #stand-button').attr('disabled', true);
    var dealerTotal = dealerHand.calculatePoints();
    var playerTotal = playerHand.calculatePoints();
    while (dealerHand.calculatePoints() < 17 || dealerHand.calculatePoints() < playerHand) {
      var card = deck.draw();
      dealerHand.addCard(card);
      $('#dealer-hand').append('<img class="card" src="' + card.getImageUrl() + '">');
      $('#dealer-points').text(dealerHand.calculatePoints());
    }
    if (dealerHand.calculatePoints() > 21) {
      $('#messages').append('Dealer busts');
      $('#hit-button, #stand-button').attr('disabled', true);
  }
  else {
    winner();
  }
});


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


  function winner() {
    if (playerHand.calculatePoints() < dealerHand.calculatePoints()) {
      $('#messages').append('Dealer wins');
    } else if (dealerHand.calculatePoints() < playerHand.calculatePoints()) {
      $('#messages').append('You win');
    } else if (playerHand.calculatePoints() === 21) {
      $('#messages').append('Blackjack!');
    } else {
      $('#messages').append('Push');
    }
  }


});
