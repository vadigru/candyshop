'use strict';
(function () {
  var catalogCards = document.querySelector('.catalog__cards');
  var filterBar = document.querySelector('.catalog__sidebar');
  // морожко ------------------------------------------------------------------
  var iceCream = filterBar.querySelector('[for="filter-icecream"]+span');
  var iceCreamType = filterBar.querySelector('#filter-icecream+label').textContent;
  var filterIceCream = filterBar.querySelector('#filter-icecream');
  // газировка ----------------------------------------------------------------
  var soda = filterBar.querySelector('[for="filter-soda"]+span');
  var sodaType = filterBar.querySelector('#filter-soda+label').textContent;
  var filterSoda = filterBar.querySelector('#filter-soda');
  // жувка --------------------------------------------------------------------
  var bubbleGum = filterBar.querySelector('[for="filter-gum"]+span');
  var bubbleGumType = filterBar.querySelector('#filter-gum+label').textContent;
  var filterBubbleGum = filterBar.querySelector('#filter-gum');
  // мармелад -----------------------------------------------------------------
  var marmalade = filterBar.querySelector('[for="filter-marmalade"]+span');
  var marmaladeType = filterBar.querySelector('#filter-marmalade+label').textContent;
  var filterMarmalade = filterBar.querySelector('#filter-marmalade');
  // зефир --------------------------------------------------------------------
  var marshmellow = filterBar.querySelector('[for="filter-marshmallows"]+span');
  var marshmallowType = filterBar.querySelector('#filter-marshmallows+label').textContent;
  var filterMarshmallow = filterBar.querySelector('#filter-marshmallows');
  // сахар веган глутен -------------------------------------------------------
  var sugarFree = filterBar.querySelector('[for="filter-sugar-free"]+span');
  var filterSugarFree = filterBar.querySelector('#filter-sugar-free');
  var vegetarian = filterBar.querySelector('[for="filter-vegetarian"]+span');
  var filterVegetarian = filterBar.querySelector('#filter-vegetarian');
  var glutenFree = filterBar.querySelector('[for="filter-gluten-free"]+span');
  var filterGlutenFree = filterBar.querySelector('#filter-gluten-free');
  // цена ползунок ------------------------------------------------------------
  var pricePlace = filterBar.querySelector('.range__count');
  // избранные товары ---------------------------------------------------------
  var filterFavoritesBtn = filterBar.querySelector('#filter-favorite');
  // товары в наличии ---------------------------------------------------------
  var goodsAvailable = filterBar.querySelector('[for="filter-availability"]+span');
  var filterAvailableBtn = filterBar.querySelector('#filter-availability');
  // цена большая маленькая рейтинг отмена фильтров----------------------------
  var filterPriceBig = filterBar.querySelector('#filter-expensive');
  var filterPriceSmall = filterBar.querySelector('#filter-cheep');
  var filterRate = filterBar.querySelector('#filter-rating');
  var cancelAllFiltersBtn = filterBar.querySelector('.catalog__submit');

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
  var rangeDefaultPosition = function () {
    rangeBtnLeft.style.left = 0 + 'px';
    rangeBtnLeft.style.zIndex = 1000;
    rangeMin.textContent = '0';
    rangeFillLine.style.left = 0;
    rangeBtnRight.style.left = 240 + 'px';
    rangeBtnRight.style.zIndex = 1000;
    rangeMax.textContent = '100';
    rangeFillLine.style.right = 0;
  };

  rangeDefaultPosition();

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
      window.util.debounce(filter(evt));

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
      window.util.debounce(filter(evt));
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

  // получаем количество товаров по типу --------------------------------------
  var marshmellowCount = 0;
  var bubbleGumCount = 0;
  var iceCreamCount = 0;
  var sodaCount = 0;
  var marmaladeCount = 0;
  var priceCount = 0;
  var sugarFreeCount = 0;
  var vegetarianCount = 0;
  var glutenFreeCount = 0;
  var goodsAvailableCount = 0;

  var kindCount = function () {
    var whatKind = function (kind) {
      if (kind.kind === 'Мороженое') {
        iceCreamCount++;
      }
      if (kind.kind === 'Газировка') {
        sodaCount++;
      }
      if (kind.kind === 'Жевательная резинка') {
        bubbleGumCount++;
      }
      if (kind.kind === 'Мармелад') {
        marmaladeCount++;
      }
      if (kind.kind === 'Зефир') {
        marshmellowCount++;
      }
      if (kind.nutritionFacts.sugar === false) {
        sugarFreeCount++;
      }
      if (kind.nutritionFacts.vegetarian === true) {
        vegetarianCount++;
      }
      if (kind.nutritionFacts.gluten === false) {
        glutenFreeCount++;
      }
      if (kind.price >= 0) {
        priceCount++;
      }
      if (kind.amount > 0) {
        goodsAvailableCount++;
      }
    };
    window.sweetArray.slice().filter(whatKind);

    iceCream.textContent = '(' + iceCreamCount + ')';
    soda.textContent = '(' + sodaCount + ')';
    bubbleGum.textContent = '(' + bubbleGumCount + ')';
    marmalade.textContent = '(' + marmaladeCount + ')';
    marshmellow.textContent = '(' + marshmellowCount + ')';
    pricePlace.textContent = '(' + priceCount + ')';
    goodsAvailable.textContent = '(' + goodsAvailableCount + ')';
    sugarFree.textContent = '(' + sugarFreeCount + ')';
    vegetarian.textContent = '(' + vegetarianCount + ')';
    glutenFree.textContent = '(' + glutenFreeCount + ')';
  };

  // отменяем все фильтры -----------------------------------------------------
  var cancelAllFilters = function () {
    var allFilters = document.querySelectorAll('.catalog__filter [type="checkbox"]');
    [].forEach.call(allFilters, function (item) {
      item.checked = false;
    });

  };

  // сортировака популярные товары в исходном порядке, ------------------------
  // в котором они были загружены с сервера -----------------------------------
  var filterPopularHandler = function (evt) {
    evt.preventDefault();
    cancelAllFilters();
    rangeDefaultPosition();
    updateSweets(evt, window.sweetArray);
  };
  // проверяем наличие избранных товаров --------------------------------------
  var isFavorite = function (fav) {
    return fav.favorite === true;
  };

  // проверяем товары в наличии -----------------------------------------------
  var isAvailable = function (it) {
    return it.amount > 0;
  };

  // проверка на сахар вегетарианство глютен ----------------------------------
  var isSugar = function (it) {
    return it.nutritionFacts.sugar === false;
  };

  var isVeg = function (it) {
    return it.nutritionFacts.vegetarian === true;
  };

  var isGluten = function (it) {
    return it.nutritionFacts.gluten === false;
  };

  // делаем выборку по цене --------------------------------------------------
  var isPriceOk = function (value) {
    var res = (value.price >= parseInt(rangeMin.textContent, 10) && value.price <= parseInt(rangeMax.textContent, 10));
    return res;
  };

  // показываем скрываем текст если фильтры слишком строгие -------------------
  var showEmptyFiltersText = function () {
    var template = document.querySelector('#empty-filters');
    var el = template.content.cloneNode(true);
    catalogCards.appendChild(el);
  };

  var hideEmptyFiltersText = function () {
    var emptyFiltersText = document.querySelector('.catalog__empty-filter');
    if (!emptyFiltersText) {
      return;
    }
    catalogCards.removeChild(emptyFiltersText);
  };
  // проверяем пустой массив или нет -------------------------------------------
  var isArrayEmpty = function (arr) {
    var emptyFiltersText = document.querySelector('.catalog__empty-filter');
    if (arr.length === 0 && !emptyFiltersText) {
      showEmptyFiltersText();
    } else if (arr.length === 0 && emptyFiltersText) {
      return;
    } else {
      hideEmptyFiltersText();
    }
  };

  // отрисовываем корточки со сладостями после применения фильтров ------------
  // применяем сортировку -----------------------------------------------------
  var updateSweets = function (evt, arr) {
    var target = evt.target;
    var cCards = document.querySelectorAll('.catalog__card');
    [].forEach.call(cCards, function (item) {
      catalogCards.removeChild(item);
    });
    if (target === filterFavoritesBtn) {
      var tempFavArr = window.sweetArray.slice().filter(isFavorite);
      arr = tempFavArr.slice().filter(isPriceOk);
      cancelAllFilters();
      rangeDefaultPosition();
      filterFavoritesBtn.checked = true;
      filterAvailableBtn.checked = false;
    }
    if (target === filterAvailableBtn) {
      var tempAvailableArr = window.sweetArray.slice().filter(isAvailable);
      arr = tempAvailableArr.slice().filter(isPriceOk);
      pricePlace.textContent = '(' + arr.length + ')';
      cancelAllFilters();
      rangeDefaultPosition();
      filterAvailableBtn.checked = true;
      filterFavoritesBtn.checked = false;
    }
    if (filterSugarFree.checked ||
      filterVegetarian.checked ||
      filterGlutenFree.checked ||
      filterPriceBig.checked ||
      filterPriceSmall.checked ||
      filterRate.checked) {
      if (filterSugarFree.checked) {
        arr = arr.slice().filter(isSugar);
      }
      if (filterVegetarian.checked) {
        arr = arr.slice().filter(isVeg);
      }
      if (filterGlutenFree.checked) {
        arr = arr.slice().filter(isGluten);
      }
      if (filterPriceBig.checked) {
        arr = arr.slice().sort(function (a, b) {
          return b.price - a.price;
        });
      }
      if (filterPriceSmall.checked) {
        arr = arr.slice().sort(function (a, b) {
          return a.price - b.price;
        });
      }
      if (filterRate.checked) {
        arr = arr.slice().sort(function (a, b) {
          if (b.rating.value === a.rating.value) {
            return b.rating.number - a.rating.number;
          } else {
            return (b.rating.value) - (a.rating.value);
          }
        });
      }
    }
    isArrayEmpty(arr);
    arr = arr.slice().filter(isPriceOk);
    pricePlace.textContent = '(' + arr.length + ')';
    catalogCards.appendChild(window.renderSweetCards(arr));
    var favBtnAll = document.querySelectorAll('.card__btn-favorite');
    [].forEach.call(favBtnAll, function (fav, i) {
      if (arr[i].favorite === true) {
        fav.classList.add('card__btn-favorite--selected');
      }
    });
    cCards = document.querySelectorAll('.catalog__card');
    window.cart.addAtribute(cCards, arr);
    window.cart.addCart(cCards, arr);
    window.favorites.addToFavorites(arr);
    window.catalog.setPointerToComposition();
  };

  // фильтруем массив по заданным критериям -----------------------------------
  var filterCheck = function (it) {
    var res;
    if (filterIceCream.checked ||
        filterSoda.checked ||
        filterBubbleGum.checked ||
        filterMarmalade.checked ||
        filterMarshmallow.checked) {
      if (filterIceCream.checked && it.kind === iceCreamType) {
        res = true;
      }
      if (filterSoda.checked && it.kind === sodaType) {
        res = true;
      }
      if (filterBubbleGum.checked && it.kind === bubbleGumType) {
        res = true;
      }
      if (filterMarmalade.checked && it.kind === marmaladeType) {
        res = true;
      }
      if (filterMarshmallow.checked && it.kind === marshmallowType) {
        res = true;
      }
    } else {
      res = window.sweetArray;
    }
    return res;
  };

  // получаем отфильтрованный массив и передаем на отрисовку ------------------
  var filter = function (evt) {
    var priceArray = window.sweetArray.slice().filter(isPriceOk);
    var newSweetArray = priceArray.slice().filter(function (it) {
      return filterCheck(it);
    });
    updateSweets(evt, newSweetArray);
  };

  // слушатели для фильтров ---------------------------------------------------
  filterBar.addEventListener('change', function (evt) {
    window.util.debounce(filter(evt));
  });

  cancelAllFiltersBtn.addEventListener('click', filterPopularHandler);

  window.filter = {
    filter: filter,
    kindCount: kindCount
  };
}());
