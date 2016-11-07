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

//renders image of corresponding card based on point value
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

//Deals inital cards
  $('#deal-button').click(function() {
    dealCard(deck, '#player-hand', '#player-points', playerHand);
    dealCard(deck, '#dealer-hand', '#dealer-points', dealerHand);
    dealCard(deck, '#player-hand', '#player-points', playerHand);
    dealHiddenCard(deck);
  });

//Hit me!  Gives player additional card
  $('#hit-button').click(function () {
    var card = deck.draw();
    playerHand.addCard(card);
    $('#player-hand').append('<img class="card" src="' + card.getImageUrl() + '">');
    $('#player-points').text(playerHand.calculatePoints());
    var total = playerHand.calculatePoints();
    if (total > 21) {
      console.log(total);
      $('#messages').text('Bust');
      $('#hit-button', '#stand-button').prop('disabled', true);
    }
    var total2 = dealerHand.calculatePoints();
    if (total2 > 21) {
      console.log(total);
      $('#messages').text('Dealer busts');
    }
  });

//Make it show the dealer card
  $('#stand-button').click(function () {
    $("#hit-button").prop('disabled', true);
    // console.log(dealerHand);
    // console.log(dealerHand.hand["0"].point);
    var card = dealerHand.hand["0"].point;
    $('#hidden-dealer-hand').append('<img class="card" src="' + card.getImageUrl() + '">');
    var dealerTotal = dealerHand.calculatePoints();
    var playerTotal = playerHand.calculatePoints();
    while (dealerHand.calculatePoints() < 17 || dealerHand.calculatePoints() < playerHand) {
      dealCard(deck, '#dealer-hand', '#dealer-points', dealerHand);
      // var card = deck.draw();
      // dealerHand.addCard(card);
      // $('#dealer-hand').append('<img class="card" src="' + card.getImageUrl() + '">');
      // $('#dealer-points').text(dealerHand.calculatePoints());
    }
    if (dealerHand.calculatePoints() > 21) {
      $('#messages').append('Dealer busts');
      $('#hit-button, #stand-button').prop('disabled', true);
  }
  else {
    winner();
  }
});

  function dealHiddenCard(deck) {
    var card = deck.draw();
    dealerHand.addCard(card);
    $('#dealer-hand').append('<img class="card" src="images/cardback.png">');
  }

//Deals a single card to player or dealer depending on arguments passed
  function dealCard(deck, handHolder, handPoints, handHolderArr) { //puns for days
    var card = deck.draw();
    handHolderArr.addCard(card);
    $(handHolder).append('<img class="card" src="' + card.getImageUrl() + '">');
    $(handPoints).text(handHolderArr.calculatePoints());
    console.log(handHolderArr.calculatePoints());
  }

//checks for the winner
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
