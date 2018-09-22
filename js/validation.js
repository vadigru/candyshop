'use strict';
(function () {
  // валидация карты ----------------------------------------------------------
  var payment = document.querySelector('.payment');
  var cardNumber = payment.querySelector('#payment__card-number');
  var cardDate = payment.querySelector('#payment__card-date');
  var cardCvc = payment.querySelector('#payment__card-cvc');
  var cardHolder = payment.querySelector('#payment__cardholder');
  // --- валидация карты по алгоритму луна ------------------------------------
  var luhnCheck = function (string) {
    var stringArray = string.split('');
    var sum = 0;
    var result;
    if (stringArray.length >= 13 && stringArray.length <= 16) {
      for (var i = 0; i < stringArray.length; i++) {
        var number = parseInt(stringArray[i], 10);
        if (stringArray.length % 2 === 0) {
          if (i % 2 !== 0) {
            sum += number;
          } else {
            var oddIndex = number * 2;
            if (oddIndex > 9) {
              oddIndex -= 9;
              sum += oddIndex;
            } else {
              sum += oddIndex;
            }
          }
        } else {
          if (i % 2 !== 0) {
            var evenIndex = number * 2;
            if (evenIndex > 9) {
              evenIndex -= 9;
              sum += evenIndex;
            } else {
              sum += evenIndex;
            }
          } else {
            sum += number;
          }
        }
      }
    } else {
      return false;
    }
    result = sum % 10 === 0 ? true : false;
    return result;
  };

  // --- проверка даты ----------------------------------------------------------
  var dateCheck = function () {
    var date = cardDate.value;
    var currentYear = (new Date()).getFullYear();
    var currentMonth = (new Date()).getMonth();
    var dateArr = date.split('/');
    var result;
    if (parseInt(dateArr[0], 10) < (currentMonth + 1) && ('20' + parseInt(dateArr[1], 10)) <= currentYear) {
      result = false;
    } else {
      result = true;
    }
    return result;
  };

  // --- проверка имени ---------------------------------------------------------
  var holderCheck = function (name) {
    var holderArray = name.split(' ');
    var result;
    if (holderArray.length < 2 || holderArray.length > 25) {
      result = false;
    } else {
      result = true;
    }
    return result;
  };

  // --- меняем имя на большие буквы --------------------------------------------
  var nameChangeHandler = function () {
    var cardHolderValue = cardHolder.value;
    cardHolder.value = cardHolderValue.toUpperCase();
  };

  // --- проверка правильности всех полей ---------------------------------------
  var cardCheckHanler = function () {
    var cardValue = cardNumber.value;
    var cardHolderName = cardHolder.value;
    var cardStatus = document.querySelector('.payment__card-status');
    if (luhnCheck(cardValue) === true && dateCheck() === true && cardCvc.value !== '' && holderCheck(cardHolderName) === true) {
      cardStatus.textContent = 'Одобрен';
    } else {
      cardStatus.textContent = 'Неизвестен';
    }
  };

  cardNumber.addEventListener('change', cardCheckHanler);
  cardDate.addEventListener('change', cardCheckHanler);
  cardCvc.addEventListener('change', cardCheckHanler);
  cardHolder.addEventListener('change', cardCheckHanler);
  cardHolder.addEventListener('input', nameChangeHandler);
}());
