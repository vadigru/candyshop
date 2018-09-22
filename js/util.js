'use strict';
(function () {
  // переводим числовое значение в класс ----------------------------------------
  var amountToClass = function (amount) {
    var cardClass;
    if (amount > 5) {
      cardClass = 'card--in-stock';
    } else if (amount >= 1 && amount <= 5) {
      cardClass = 'card--little';
    } else if (amount === 0) {
      cardClass = 'card--soon';
    }
    return cardClass;
  };

  window.util = {
    // заменяем число на класс ----------------------------------------------------
    valueToStars: {
      1: 'stars__rating--one',
      2: 'stars__rating--two',
      3: 'stars__rating--three',
      4: 'stars__rating--four',
      5: 'stars__rating--five'
    },
    amountToClass: amountToClass
  };
}());
