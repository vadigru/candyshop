'use strict';
(function () {
  var pay = document.querySelector('.payment');
  var creditCardNumber = pay.querySelector('#payment__card-number');
  var creditCardDate = pay.querySelector('#payment__card-date');
  var creditCardCvc = pay.querySelector('#payment__card-cvc');
  var creditCardHolder = pay.querySelector('#payment__cardholder');
  var payFields = pay.querySelectorAll('input');
  var MIN_NUM_LENGTH = 13;
  var MAX_NUM_LENGTH = 16;
  var CONTROL_NUM = 9;
  var MIN_NUM_CVC = 100;
  var MAX_NUM_CVC = 999;
  var EVEN_CHECK = 2;
  var EVEN_CHECK_RES = 10;

  // --- валидация карты по алгоритму луна ------------------------------------
  var luhnCheckHandler = function () {
    var creditCardValue = creditCardNumber.value;
    var stringArray = creditCardValue.split('');
    var sum = 0;
    var result;
    if (stringArray.length >= MIN_NUM_LENGTH && stringArray.length <= MAX_NUM_LENGTH) {
      for (var i = 0; i < stringArray.length; i++) {
        var num = parseInt(stringArray[i], 10);
        var multiplyNumber = num * 2;
        if (stringArray.length % EVEN_CHECK === 0) {
          if (i % EVEN_CHECK !== 0) {
            sum += num;
          } else {
            var oddIndex = multiplyNumber;
            if (oddIndex > CONTROL_NUM) {
              oddIndex -= CONTROL_NUM;
              sum += oddIndex;
            } else {
              sum += oddIndex;
            }
          }
        } else {
          if (i % EVEN_CHECK !== 0) {
            var evenIndex = multiplyNumber;
            if (evenIndex > CONTROL_NUM) {
              evenIndex -= CONTROL_NUM;
              sum += evenIndex;
            } else {
              sum += evenIndex;
            }
          } else {
            sum += num;
          }
        }
      }
    } else {
      return false;
    }
    result = sum % EVEN_CHECK_RES === 0 ? true : false;
    return result;
  };

  // --- проверка даты ----------------------------------------------------------
  var dateCheckHandler = function () {
    var date = creditCardDate.value;
    var currentYear = (new Date()).getFullYear();
    var currentMonth = (new Date()).getMonth();
    var monthCorrection = currentMonth + 1;
    var dateArr = date.split('/');
    var firstArrEl = parseInt(dateArr[0], 10);
    var secondArrEl = ('20' + parseInt(dateArr[1], 10));
    var result;
    if (firstArrEl < monthCorrection && secondArrEl <= currentYear || dateArr.length < 2) {
      result = false;
    } else {
      result = true;
    }
    return result;
  };

  var cvcCheckHandler = function () {
    var cvcNum = parseInt(creditCardCvc.value, 10);
    var result;
    if (cvcNum >= MIN_NUM_CVC && cvcNum <= MAX_NUM_CVC) {
      result = true;
    }
    return result;
  };

  // --- проверка имени ---------------------------------------------------------
  var holderCheckHandler = function () {
    var creditCardHolderName = creditCardHolder.value;
    var holderArray = creditCardHolderName.split(' ');
    var arrEl = holderArray[0];
    var result;
    creditCardHolder.value = creditCardHolderName.toUpperCase();
    if (arrEl === '') {
      result = false;
    } else {
      result = true;
    }
    return result;
  };

  // --- проверка правильности всех полей ---------------------------------------
  var creditCardCheckHanler = function () {
    var creditCardStatus = document.querySelector('.payment__card-status');
    var luhn = luhnCheckHandler();
    var date = dateCheckHandler();
    var cvc = cvcCheckHandler();
    var holder = holderCheckHandler();
    if (luhn && date && cvc && holder) {
      creditCardStatus.textContent = 'Одобрен';
    } else {
      creditCardStatus.textContent = 'Неизвестен';
    }
  };

  creditCardNumber.addEventListener('change', luhnCheckHandler);
  creditCardDate.addEventListener('change', dateCheckHandler);
  creditCardCvc.addEventListener('change', cvcCheckHandler);
  creditCardHolder.addEventListener('input', holderCheckHandler);
  [].forEach.call(payFields, function (item) {
    item.addEventListener('change', creditCardCheckHanler);
  });
}());
