'use strict';
(function () {
  // упраление слайдером выбора цены --------------------------------------------
  var MAX = 240;
  var MIN = 0;
  var PIN_SIZE = 10;
  var PIN_SIZE_HALF = PIN_SIZE / 2;
  var PCT = 100;
  var range = document.querySelector('.range');
  var rangeMin = range.querySelector('.range__price--min');
  var rangeMax = range.querySelector('.range__price--max');
  var rangeFillLine = range.querySelector('.range__fill-line');
  var rangeBtnLeft = range.querySelector('.range__btn--left');
  var rangeBtnRight = range.querySelector('.range__btn--right');
  // --- задаем начальные координаты и положение --------------------------------
  rangeBtnLeft.style.left = -10 + 'px';
  rangeBtnLeft.style.zIndex = 1000;
  rangeMin.textContent = '0';
  rangeFillLine.style.left = 0;
  rangeBtnRight.style.right = -5 + 'px';
  rangeBtnRight.style.zIndex = 1000;
  rangeMax.textContent = '100';
  rangeFillLine.style.right = 0;
  // --- отображаем положение в процентах относительно пикселей -----------------
  var currentPositionInPct = function (currentPosition) {
    return Math.round(currentPosition * PCT / MAX);
  };
  // --- слуашетель на левый пин ------------------------------------------------
  rangeBtnLeft.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
    };
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      startCoords = {
        x: moveEvt.clientX
      };
      var positionLeftShifted = (rangeBtnLeft.offsetLeft - shift.x);

      if (positionLeftShifted <= -PIN_SIZE) {
        positionLeftShifted = -PIN_SIZE;
      } else if (positionLeftShifted >= MAX) {
        positionLeftShifted = MAX + 'px';
      } else if (positionLeftShifted >= rangeBtnRight.offsetLeft - PIN_SIZE) {
        positionLeftShifted = rangeBtnRight.offsetLeft - PIN_SIZE;
        rangeBtnLeft.style.left = positionLeftShifted + 'px';
      } else {
        rangeBtnLeft.style.left = positionLeftShifted + 'px';
        rangeMin.textContent = currentPositionInPct(positionLeftShifted + PIN_SIZE);
      }
      rangeFillLine.style.left = positionLeftShifted + PIN_SIZE_HALF + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      var positionLeftUp = rangeBtnLeft.offsetLeft;
      rangeMin.textContent = currentPositionInPct(positionLeftUp + PIN_SIZE);

      if (dragged) {
        var onClickPreventDefault = function () {
          evt.preventDefault();
          rangeBtnLeft.removeEventListener('click', onClickPreventDefault);
        };
        rangeBtnLeft.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  // --- слушатель на правый пин ------------------------------------------------
  rangeBtnRight.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX
    };
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      startCoords = {
        x: moveEvt.clientX
      };
      var positionRightStop = (MAX - rangeBtnRight.offsetLeft - shift.x);
      var positionRightShifted = (rangeBtnRight.offsetLeft - shift.x);
      if (positionRightShifted > MAX) {
        positionRightShifted = MAX + 'px';
      } else if (positionRightShifted <= MIN) {
        positionRightShifted = MIN + 'px';
      } else if (positionRightShifted <= rangeBtnLeft.offsetLeft + PIN_SIZE) {
        positionRightShifted = rangeBtnLeft.offsetLeft;
        rangeBtnRight.style.left = positionRightShifted + PIN_SIZE + 'px';
      } else {
        rangeBtnRight.style.left = positionRightShifted + 'px';
        rangeMax.textContent = currentPositionInPct(positionRightShifted);
      }
      if (positionRightStop <= MIN) {
        positionRightStop = MIN;
      } else {
        rangeFillLine.style.right = positionRightStop + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      var positionRightUp = rangeBtnRight.offsetLeft;
      rangeMax.textContent = currentPositionInPct(positionRightUp);
      if (dragged) {
        var onClickPreventDefault = function () {
          evt.preventDefault();
          rangeBtnRight.removeEventListener('click', onClickPreventDefault);
        };
        rangeBtnRight.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // сортировка по рейтингу ---------------------------------------------------
  var filterRatingHandling = function () {
    var catalogCards = document.querySelector('.catalog__cards');
    var cCards = document.querySelectorAll('.catalog__card');

    [].forEach.call(cCards, function (item) {
      catalogCards.removeChild(item);
    });

    var newArr = window.sweetArray
        .slice()
        .sort(function (a, b) {
          if (b.rating.value === a.rating.value) {
            return b.rating.number - a.rating.number;
          } else {
            return (b.rating.value) - (a.rating.value);
          }
        });
    catalogCards.appendChild(window.renderSweetCards(newArr));
    cCards = document.querySelectorAll('.catalog__card');
    window.cart.addAtribute(cCards, newArr);
    window.cart.addCart(cCards, newArr);
  };

  // сортировка по цене сначала дешевые ---------------------------------------
  var filterCheepHandling = function () {
    var catalogCards = document.querySelector('.catalog__cards');
    var cCards = document.querySelectorAll('.catalog__card');

    [].forEach.call(cCards, function (item) {
      catalogCards.removeChild(item);
    });
    var newArr = window.sweetArray
        .slice()
        .sort(function (a, b) {
          return a.price - b.price;
        });

    catalogCards.appendChild(window.renderSweetCards(newArr));
    cCards = document.querySelectorAll('.catalog__card');
    window.cart.addAtribute(cCards, newArr);
    window.cart.addCart(cCards, newArr);
  };

  var filterExpensiveHandling = function () {
    var catalogCards = document.querySelector('.catalog__cards');
    var cCards = document.querySelectorAll('.catalog__card');

    [].forEach.call(cCards, function (item) {
      catalogCards.removeChild(item);
    });
    var newArr = window.sweetArray
        .slice()
        .sort(function (a, b) {
          return b.price - a.price;
        });

    catalogCards.appendChild(window.renderSweetCards(newArr));
    cCards = document.querySelectorAll('.catalog__card');
    window.cart.addAtribute(cCards, newArr);
    window.cart.addCart(cCards, newArr);
  };


  var filter = function () {
    var filterRate = document.querySelector('#filter-rating');
    var filterPriceSmall = document.querySelector('#filter-cheep');
    var filterPriceBig = document.querySelector('#filter-expensive');

    filterRate.addEventListener('change', filterRatingHandling);
    filterPriceSmall.addEventListener('change', filterCheepHandling);
    filterPriceBig.addEventListener('change', filterExpensiveHandling);

  };

  window.filter = {
    filter: filter
  };
}());
