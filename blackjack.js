$(document).ready(function() {
  var dealerHand = [];
  var playerHand = [];
  var deck = [
    { point: 1, suit: 'hearts' },
    { point: 2, suit: 'hearts' },
    { point: 3, suit: 'hearts' },
    { point: 4, suit: 'hearts' },
    { point: 5, suit: 'hearts' },
    { point: 6, suit: 'hearts' },
    { point: 7, suit: 'hearts' },
    { point: 8, suit: 'hearts' },
    { point: 9, suit: 'hearts' },
    { point: 10, suit: 'hearts' },
    { point: 11, suit: 'hearts' },
    { point: 12, suit: 'hearts' },
    { point: 13, suit: 'hearts' },
    { point: 1, suit: 'diamonds' },
    { point: 2, suit: 'diamonds' },
    { point: 3, suit: 'diamonds' },
    { point: 4, suit: 'diamonds' },
    { point: 5, suit: 'diamonds' },
    { point: 6, suit: 'diamonds' },
    { point: 7, suit: 'diamonds' },
    { point: 8, suit: 'diamonds' },
    { point: 9, suit: 'diamonds' },
    { point: 10, suit: 'diamonds' },
    { point: 11, suit: 'diamonds' },
    { point: 12, suit: 'diamonds' },
    { point: 13, suit: 'diamonds' },
    { point: 1, suit: 'clubs' },
    { point: 2, suit: 'clubs' },
    { point: 3, suit: 'clubs' },
    { point: 4, suit: 'clubs' },
    { point: 5, suit: 'clubs' },
    { point: 6, suit: 'clubs' },
    { point: 7, suit: 'clubs' },
    { point: 8, suit: 'clubs' },
    { point: 9, suit: 'clubs' },
    { point: 10, suit: 'clubs' },
    { point: 11, suit: 'clubs' },
    { point: 12, suit: 'clubs' },
    { point: 13, suit: 'clubs' },
    { point: 1, suit: 'spades' },
    { point: 2, suit: 'spades' },
    { point: 3, suit: 'spades' },
    { point: 4, suit: 'spades' },
    { point: 5, suit: 'spades' },
    { point: 6, suit: 'spades' },
    { point: 7, suit: 'spades' },
    { point: 8, suit: 'spades' },
    { point: 9, suit: 'spades' },
    { point: 10, suit: 'spades' },
    { point: 11, suit: 'spades' },
    { point: 12, suit: 'spades' },
    { point: 13, suit: 'spades' }
  ];
  console.log(deck[4]);
  $('#deal-button').click(function() {
    dealCards(deck);
    console.log(deck);
    console.log(playerHand);
    console.log(dealerHand);
  });

  $('#hit-button').click(function () {
    $('#player-hand').append('<img class="card" src="images/3_of_diamonds.png">');
  });


  function dealCards(deck) {
    var pcard1 = deck.pop();
    playerHand.push(pcard1);
    $('#player-hand').append('<img class="card" src="' + getCardImageUrl(pcard1) + '">');
    var pcard2 = deck.pop();
    playerHand.push(pcard2);
    $('#player-hand').append('<img class="card" src="' + getCardImageUrl(pcard2) + '">');
    var dcard1 = deck.pop();
    dealerHand.push(dcard1);
    $('#dealer-hand').append('<img class="card" src="' + getCardImageUrl(dcard1) + '">');
    var dcard2 = deck.pop();
    dealerHand.push(dcard2);
    $('#dealer-hand').append('<img class="card" src="' + getCardImageUrl(dcard2) + '">');

  }

  function getCardImageUrl(card) {
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

});
