function calculatePoints(cards) {
  cards = cards.slice(0); //makes copy of the array
  cards.sort(function(a, b) {
    return b.point - a.point;
  });
  return cards.reduce(function(sum, card) {
    var point = card.point;
    if (point > 10) {
      point = 10;
    }
    if (point === 1 && sum < 11) { //accounts for aces
      point = 11;
    }
    return sum + point;
  }, 0);
}

function newDeck() {
 var deck = [];
 var suits = ['spades', 'hearts', 'clubs', 'diamonds'];
 for (var i = 1; i <= 13; i++) {
   for (var j = 0; j <= 3; j++) {
     deck.push({'point': i, 'suit': suits[i]});
   }
 }
 return deck;
}

function deal(handSelector) {
  var card = deck.pop();
  playerHand.push(card);
  $(handSelector).append('<img class="card src="' + getCardImageUrl(card) + '">');
}

// var playerPoints = calculatePoints(playerHand);
// $('#player-')
