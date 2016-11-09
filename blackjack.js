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
  };
  Hand.prototype.calculatePoints = function() {  //calculates points for a hand
    // var hand = this.hand.slice(0);
    // hand.sort(function (a, b) {
    //   return b.point - a.point;
    // });
    var total = 0,
    aces = 0;
    for (var i = 0; i < this.hand.length; i++) {
      var point = this.hand[i].point;
      if (point === 1) {
        total += 10;
        aces++;
      }
      else if (point > 10) {
        point = 10;
      }
      total += point;
      while (total > 21 && aces > 0) {
        total -= 10;
        aces--;
      }
    }
    return total;

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
  // $('.cardBack').hide();
  $('#hit-button, #stand-button').attr('disabled', true); //why not working

//Deals inital cards
  $('#deal-button').click(function() {
    this.disabled=true;
    $('#hit-button, #stand-button').attr('disabled', false);
    // debugger
    dealCard(deck, '#player-hand', '#player-points', playerHand);
    dealCard(deck, '#dealer-hand', '#dealer-points', dealerHand);
    dealCard(deck, '#player-hand', '#player-points', playerHand);
    dealHiddenCard(deck);  //hidden card value goes into deck but does not display yet
    if (playerHand.calculatePoints() === 21) {
      $('#messages').append('Blackjack!');
    }
    //check for winner

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
    $("#hit-button, #deal-button").attr('disabled', true);
    $('.hiddencard').attr("src", dealerHand.hand[1].getImageUrl());
    // var card = dealerHand.hand[1]; //check to make sure right card
    var dealerTotal = dealerHand.calculatePoints();
    var playerTotal = playerHand.calculatePoints();
    //checks total of dealer hand is less than 17 or less than player hand and adds cards accordingly
    while (dealerHand.calculatePoints() < 17 || dealerHand.calculatePoints() < playerHand) {
      dealCard(deck, '#dealer-hand', '#dealer-points', dealerHand);
    }
    if (dealerHand.calculatePoints() > 21) {
      $('#messages').append('Dealer busts. You win!');
      $('#hit-button, #stand-button').prop('disabled', true); //why not working?
  }
  else {
    winner();
  }
});

  //hidden card
  function dealHiddenCard(deck) {
    var card = deck.draw();
    dealerHand.addCard(card);
    $('#dealer-hand').append('<img class="card hiddencard" src="images/cardback.png">');
  }

//Deals a single card to player or dealer depending on arguments passed
  function dealCard(deck, handHolder, handPoints, handHolderArr) { //puns for days
    var card = deck.draw();
    handHolderArr.addCard(card);
    $(handHolder).append('<img class="card" src="' + card.getImageUrl() + '">');
    $(handPoints).text(handHolderArr.calculatePoints());
  }

//checks for the winner
  function winner() {
    var playerTotal = playerHand.calculatePoints();
    if (playerHand.calculatePoints() < dealerHand.calculatePoints()) {
      var dealerTotal = dealerHand.calculatePoints();
      $('#messages').append('Dealer wins');
    } else if (dealerHand.calculatePoints() < playerHand.calculatePoints()) {
      $('#messages').append('You win!');
    } else {
      $('#messages').append('Push');
    }
  }


});


//not calculating facecards
