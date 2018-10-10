'use strict';
(function () {
  var MAX = 240;
  var MIN = 0;
  var PIN_SIZE = 10;
  var PIN_SIZE_HALF = PIN_SIZE / 2;
  var PCT = 100;

  var productArea = document.querySelector('.catalog__cards');
  var filterBar = document.querySelector('.catalog__sidebar');

  var iceCreamNumber = filterBar.querySelector('[for="filter-icecream"]+span');
  var iceCream = filterBar.querySelector('#filter-icecream');
  var sodaNumber = filterBar.querySelector('[for="filter-soda"]+span');
  var soda = filterBar.querySelector('#filter-soda');
  var bubbleGumNumber = filterBar.querySelector('[for="filter-gum"]+span');
  var bubbleGum = filterBar.querySelector('#filter-gum');
  var marmaladeNumber = filterBar.querySelector('[for="filter-marmalade"]+span');
  var marmalade = filterBar.querySelector('#filter-marmalade');
  var marshmellowNumber = filterBar.querySelector('[for="filter-marshmallows"]+span');
  var marshmallow = filterBar.querySelector('#filter-marshmallows');
  var sugarFreeNumber = filterBar.querySelector('[for="filter-sugar-free"]+span');
  var sugarFree = filterBar.querySelector('#filter-sugar-free');
  var vegetarianNumber = filterBar.querySelector('[for="filter-vegetarian"]+span');
  var vegetarian = filterBar.querySelector('#filter-vegetarian');
  var glutenFreeNumber = filterBar.querySelector('[for="filter-gluten-free"]+span');
  var glutenFree = filterBar.querySelector('#filter-gluten-free');

  var priceChooser = document.querySelector('.range');
  var priceChooserMin = priceChooser.querySelector('.range__price--min');
  var priceChooserMax = priceChooser.querySelector('.range__price--max');
  var priceChooserLine = priceChooser.querySelector('.range__fill-line');
  var priceChooserLeftBtn = priceChooser.querySelector('.range__btn--left');
  var priceChooserRightBtn = priceChooser.querySelector('.range__btn--right');

  var productCount = filterBar.querySelector('.range__count');
  var productFavBtn = filterBar.querySelector('#filter-favorite');
  var productAvailable = filterBar.querySelector('[for="filter-availability"]+span');
  var productAvailableBtn = filterBar.querySelector('#filter-availability');

  var sortPopular = filterBar.querySelector('#filter-popular');
  var sortPriceBig = filterBar.querySelector('#filter-expensive');
  var sortPriceSmall = filterBar.querySelector('#filter-cheep');
  var sortRating = filterBar.querySelector('#filter-rating');

  var filterCancelBtn = filterBar.querySelector('.catalog__submit');

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

  // --- задаем начальные координаты и положение --------------------------------
  var rangeDefaultPosition = function () {
    priceChooserLeftBtn.style.left = -PIN_SIZE + 'px';
    priceChooserLeftBtn.style.zIndex = 1000;
    priceChooserMin.textContent = '0';
    priceChooserLine.style.left = MIN;
    priceChooserRightBtn.style.left = MAX + 'px';
    priceChooserRightBtn.style.zIndex = 1000;
    priceChooserMax.textContent = '100';
    priceChooserLine.style.right = MIN;
  };

  rangeDefaultPosition();
  // --- отображаем положение в процентах относительно пикселей -----------------
  var currentPositionInPct = function (currentPosition) {
    return Math.round(currentPosition * PCT / MAX);
  };
  // --- слуашетель на левый пин ------------------------------------------------
  priceChooserLeftBtn.addEventListener('mousedown', function (evt) {
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
      var positionLeftShifted = (priceChooserLeftBtn.offsetLeft - shift.x);

      if (positionLeftShifted <= -PIN_SIZE) {
        positionLeftShifted = -PIN_SIZE;
      } else if (positionLeftShifted >= MAX) {
        positionLeftShifted = MAX + 'px';
      } else if (positionLeftShifted >= priceChooserRightBtn.offsetLeft - PIN_SIZE) {
        positionLeftShifted = priceChooserRightBtn.offsetLeft - PIN_SIZE;
        priceChooserLeftBtn.style.left = positionLeftShifted + 'px';
      } else {
        priceChooserLeftBtn.style.left = positionLeftShifted + 'px';
        priceChooserMin.textContent = currentPositionInPct(positionLeftShifted + PIN_SIZE);
      }
      priceChooserLine.style.left = positionLeftShifted + PIN_SIZE_HALF + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      var positionLeftUp = priceChooserLeftBtn.offsetLeft;
      priceChooserMin.textContent = currentPositionInPct(positionLeftUp + PIN_SIZE);
      window.util.debounce(upEvt);

      if (dragged) {
        var onClickPreventDefault = function () {
          evt.preventDefault();
          priceChooserLeftBtn.removeEventListener('click', onClickPreventDefault);
        };
        priceChooserLeftBtn.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  // --- слушатель на правый пин ------------------------------------------------
  priceChooserRightBtn.addEventListener('mousedown', function (evt) {
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
      var positionRightStop = (MAX - priceChooserRightBtn.offsetLeft - shift.x);
      var positionRightShifted = (priceChooserRightBtn.offsetLeft - shift.x);
      if (positionRightShifted > MAX) {
        positionRightShifted = MAX + 'px';
      } else if (positionRightShifted <= MIN) {
        positionRightShifted = MIN + 'px';
      } else if (positionRightShifted <= priceChooserLeftBtn.offsetLeft + PIN_SIZE) {
        positionRightShifted = priceChooserLeftBtn.offsetLeft;
        priceChooserRightBtn.style.left = positionRightShifted + PIN_SIZE + 'px';
      } else {
        priceChooserRightBtn.style.left = positionRightShifted + 'px';
        priceChooserMax.textContent = currentPositionInPct(positionRightShifted);
      }
      if (positionRightStop <= MIN) {
        positionRightStop = MIN;
      } else {
        priceChooserLine.style.right = positionRightStop + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      var positionRightUp = priceChooserRightBtn.offsetLeft;
      priceChooserMax.textContent = currentPositionInPct(positionRightUp);
      window.util.debounce(upEvt);
      if (dragged) {
        var onClickPreventDefault = function () {
          evt.preventDefault();
          priceChooserRightBtn.removeEventListener('click', onClickPreventDefault);
        };
        priceChooserRightBtn.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // получаем количество товаров по типу --------------------------------------
  var kindCount = function () {
    var whatKind = function (kind) {
      if (kind.kind === 'icecream') {
        iceCreamCount++;
      }
      if (kind.kind === 'soda') {
        sodaCount++;
      }
      if (kind.kind === 'gum') {
        bubbleGumCount++;
      }
      if (kind.kind === 'marmalade') {
        marmaladeCount++;
      }
      if (kind.kind === 'marshmallows') {
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

    window.catalog.sweetArray.slice().filter(whatKind);

    iceCreamNumber.textContent = '(' + iceCreamCount + ')';
    sodaNumber.textContent = '(' + sodaCount + ')';
    bubbleGumNumber.textContent = '(' + bubbleGumCount + ')';
    marmaladeNumber.textContent = '(' + marmaladeCount + ')';
    marshmellowNumber.textContent = '(' + marshmellowCount + ')';
    productCount.textContent = '(' + priceCount + ')';
    productAvailable.textContent = '(' + goodsAvailableCount + ')';
    sugarFreeNumber.textContent = '(' + sugarFreeCount + ')';
    vegetarianNumber.textContent = '(' + vegetarianCount + ')';
    glutenFreeNumber.textContent = '(' + glutenFreeCount + ')';
  };

  // отменяем фильтры ---------------------------------------------------------
  var cancelAllFilters = function () {
    var allFilters = document.querySelectorAll('.catalog__filter [type="checkbox"]');
    [].forEach.call(allFilters, function (item) {
      item.checked = false;
    });
  };

  var cancelTypefilters = function () {
    if (productFavBtn.checked || productAvailableBtn.checked) {
      iceCream.checked = false;
      soda.checked = false;
      bubbleGum.checked = false;
      marmalade.checked = false;
      marshmallow.checked = false;
      sugarFree.checked = false;
      vegetarian.checked = false;
      glutenFree.checked = false;
    }
  };

  var cancelFavoriteAndAvailable = function (evt) {
    var target = evt.target;
    if (target === iceCream ||
        target === soda ||
        target === bubbleGum ||
        target === marmalade ||
        target === marshmallow ||
        target === sugarFree ||
        target === vegetarian ||
        target === glutenFree) {
      productAvailableBtn.checked = false;
      productFavBtn.checked = false;
    }
  };

  // сортировака популярные товары в исходном порядке, ------------------------
  // в котором они были загружены с сервера -----------------------------------
  var filterPopularHandler = function (evt) {
    evt.preventDefault();
    cancelAllFilters();
    rangeDefaultPosition();
    sortPopular.checked = true;
    updateSweets(evt, window.catalog.sweetArray);
  };
  // проверяем наличие избранных товаров --------------------------------------
  var isFavorite = function (fav) {
    return fav.favorite === true;
  };

  // проверяем товары в наличии -----------------------------------------------
  var isAvailable = function (avail) {
    return avail.amount > 0;
  };

  // делаем выборку по цене --------------------------------------------------
  var isPriceOk = function (value) {
    return value.price >= parseInt(priceChooserMin.textContent, 10) && value.price <= parseInt(priceChooserMax.textContent, 10);
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

  // показываем скрываем текст если фильтры слишком строгие -------------------
  var showEmptyFiltersText = function () {
    var template = document.querySelector('#empty-filters');
    var el = template.content.cloneNode(true);
    productArea.appendChild(el);
  };

  var hideEmptyFiltersText = function () {
    var emptyFiltersText = document.querySelector('.catalog__empty-filter');
    if (!emptyFiltersText) {
      return;
    }
    productArea.removeChild(emptyFiltersText);
  };
  // проверяем пустой массив или нет -------------------------------------------
  var isArrayEmpty = function (emp) {
    var emptyFiltersText = document.querySelector('.catalog__empty-filter');
    if (emp.length === 0 && !emptyFiltersText) {
      showEmptyFiltersText();
    } else if (emp.length === 0 && emptyFiltersText) {
      return;
    } else {
      hideEmptyFiltersText();
    }
  };

  // сортировка товаров по цене и рейтингу ------------------------------------
  var sortItems = function (sort) {
    if (sortPriceBig.checked ||
        sortPriceSmall.checked ||
        sortRating.checked) {
      if (sortPriceBig.checked) {
        sort = sort.slice().sort(function (a, b) {
          return b.price - a.price;
        });
      }
      if (sortPriceSmall.checked) {
        sort = sort.slice().sort(function (a, b) {
          return a.price - b.price;
        });
      }
      if (sortRating.checked) {
        sort = sort.slice().sort(function (a, b) {
          if (b.rating.value === a.rating.value) {
            return b.rating.number - a.rating.number;
          } else {
            return (b.rating.value) - (a.rating.value);
          }
        });
      }
    }
    return sort;
  };

  // проверяем есть ли избранные товары и товары в наличии --------------------
  var checkFavoriteAndAvailability = function (evt, fav) {
    var target = evt.target;
    if (productFavBtn.checked || productAvailableBtn.checked) {
      if (productFavBtn.checked) {
        fav = window.catalog.sweetArray.slice().filter(isFavorite);
        productFavBtn.checked = true;
        productAvailableBtn.checked = false;
        if (target === productFavBtn) {
          rangeDefaultPosition();
        }
      }
      if (target === productAvailableBtn || productAvailableBtn.checked) {
        fav = window.catalog.sweetArray.slice().filter(isAvailable);
        productAvailableBtn.checked = true;
        productFavBtn.checked = false;
        if (target === productAvailableBtn) {
          rangeDefaultPosition();
        }
      }
      cancelTypefilters();

    }

    return fav;
  };
  // отрисовываем корточки со сладостями после применения фильтров ------------
  // применяем сортировку -----------------------------------------------------
  var updateSweets = function (evt, array) {
    var products = document.querySelectorAll('.catalog__card');
    [].forEach.call(products, function (item) {
      productArea.removeChild(item);
    });

    if (sugarFree.checked ||
      vegetarian.checked ||
      glutenFree.checked) {
      if (sugarFree.checked) {
        array = array.slice().filter(isSugar);
      }
      if (vegetarian.checked) {
        array = array.slice().filter(isVeg);
      }
      if (glutenFree.checked) {
        array = array.slice().filter(isGluten);
      }
      cancelFavoriteAndAvailable(evt);
    }
    array = checkFavoriteAndAvailability(evt, array);
    array = sortItems(array);
    array = array.slice().filter(isPriceOk);
    isArrayEmpty(array);
    productArea.appendChild(window.catalog.renderSweetCards(array));
    productCount.textContent = '(' + array.length + ')';
    products = document.querySelectorAll('.catalog__card');
    window.cart.addAtribute(products, array);
    window.cart.addCart(products, array);
    window.favorites.addToFavorites(array);
    window.favorites.arrangeFavorites(array);
    window.catalog.setPointerToComposition();
  };

  // фильтруем массив по заданным критериям -----------------------------------
  var filterCheck = function (evt, it) {
    var result;
    if (iceCream.checked ||
        soda.checked ||
        bubbleGum.checked ||
        marmalade.checked ||
        marshmallow.checked) {
      if (iceCream.checked && it.kind === 'icecream') {
        result = true;
      }
      if (soda.checked && it.kind === 'soda') {
        result = true;
      }
      if (bubbleGum.checked && it.kind === 'gum') {
        result = true;
      }
      if (marmalade.checked && it.kind === 'marmalade') {
        result = true;
      }
      if (marshmallow.checked && it.kind === 'marshmallows') {
        result = true;
      }
      cancelFavoriteAndAvailable(evt);
    } else {
      result = window.catalog.sweetArray;
    }
    return result;
  };

  // получаем отфильтрованный массив и передаем на отрисовку ------------------
  var filter = function (evt) {
    var newSweetArray = window.catalog.sweetArray.slice().filter(function (it) {
      return filterCheck(evt, it);
    });
    updateSweets(evt, newSweetArray);
  };


  // слушатели для фильтров ---------------------------------------------------
  filterBar.addEventListener('change', function (evt) {
    window.util.debounce(evt);
  });

  filterCancelBtn.addEventListener('click', filterPopularHandler);

  window.filter = {
    filter: filter,
    kindCount: kindCount,
    updateSweets: updateSweets
  };
}());
