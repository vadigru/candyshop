'use strict';
(function () {
  var main = document.querySelector('main');
  var productArea = main.querySelector('.catalog__cards');
  var emptyProductArea = productArea.querySelector('.catalog__load');
  var filterBar = main.querySelector('.catalog__sidebar');
  var filterBtns = filterBar .querySelectorAll('.input-btn__label');
  var filterRangeBtns = filterBar.querySelectorAll('.range__btn');
  var filterCancelBtn = filterBar.querySelector('.catalog__submit');
  var error = document.querySelector('.modal--error');

  var sweetArray = [];

  // поменять курсор с default на pointer -------------------------------------
  [].forEach.call(filterBtns, function (item) {
    item.style.cursor = 'pointer';
  });

  [].forEach.call(filterRangeBtns, function (item) {
    item.style.cursor = 'pointer';
  });

  filterCancelBtn.style.cursor = 'pointer';

  var setPointerToComposition = function () {
    var productCompositionBtns = productArea.querySelectorAll('.card__btn-composition');
    [].forEach.call(productCompositionBtns, function (item) {
      item.style.cursor = 'pointer';
    });
  };
  // скрываем надпись пустого каталога ----------------------------------------
  var showSweetCards = function () {
    productArea.classList.remove('catalog__cards--load');
    emptyProductArea.classList.add('visually-hidden');
  };

  // обработка успешно загруженных данных -------------------------------------
  var onLoadSuccessHandle = function (data) {
    window.catalog.sweetArray = data.map(function (current) {
      return current;
    });
    window.catalog.sweetArray.forEach(function (item) {
      switch (item.kind) {
        case 'Мороженое':
          item.kind = 'icecream';
          break;
        case 'Газировка':
          item.kind = 'soda';
          break;
        case 'Жевательная резинка':
          item.kind = 'gum';
          break;
        case 'Мармелад':
          item.kind = 'marmalade';
          break;
        case 'Зефир':
          item.kind = 'marshmallows';
          break;
      }
      item.favorite = false;
    });
    productArea.appendChild(renderSweetCards(window.catalog.sweetArray));
    var products = productArea.querySelectorAll('.catalog__card');
    window.cart.addAtribute(products, window.catalog.sweetArray);
    window.cart.addCart(products, window.catalog.sweetArray);
    window.favorites.addToFavorites(window.catalog.sweetArray);
    window.filter.kindCount();
    showSweetCards();
    setPointerToComposition();
  };

  // обробатка ошибок при загрузке данных -------------------------------------
  var closeErrorHandler = function (evt) {
    var nodeIn = main.querySelector('.closeErrorDialog');
    var node = main.querySelector('.errorDialog');
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      node.removeChild(nodeIn);
      main.removeChild(node);
      document.removeEventListener('keydown', closeErrorHandler);
    }
  };
  var onLoadErrorHandle = function (errorMessage) {
    error.classList.remove('modal--hidden');
    error.querySelector('div p:first-of-type').textContent = errorMessage;
    document.addEventListener('keydown', window.util.onEscClose);
  };

  window.backend.load(onLoadSuccessHandle, onLoadErrorHandle);

  // переводим числовое значение в класс ----------------------------------------
  var amountToClassName = function (amount) {
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
  // заменяем число на класс ----------------------------------------------------
  var valueToClassName = {
    1: 'stars__rating--one',
    2: 'stars__rating--two',
    3: 'stars__rating--three',
    4: 'stars__rating--four',
    5: 'stars__rating--five'
  };

  // определяем есть сахар или нет --------------------------------------------
  var getSugar = function (sugar) {
    return sugar ? 'содержит сахар' : 'без сахара';
  };

  // отображаем карточки со сладостями из массива -------------------------------
  var renderSweetCards = function (sweetData) {
    var fragment = document.createDocumentFragment();
    sweetData.forEach(function (item) {
      var productElement = document.querySelector('#card').content.cloneNode(true);
      var productPrice = productElement.querySelector('.card__price');
      var productCurrency = productElement.querySelector('.card__currency');
      var productWeight = productElement.querySelector('.card__weight');
      productElement.querySelector('.catalog__card').classList.remove('card--in-stock');
      productElement.querySelector('.catalog__card').classList.add(amountToClassName(item.amount));
      productElement.querySelector('.card__img').src = './img/cards/' + item.picture;
      productElement.querySelector('.card__title').textContent = item.name;
      productElement.querySelector('.card__img').alt = item.name;
      productPrice.textContent = item.price;
      productPrice.appendChild(productCurrency);
      productPrice.appendChild(productWeight);
      productElement.querySelector('.card__weight').textContent = '/ ' + item.weight + ' Г';
      productElement.querySelector('.stars__rating').classList.remove('stars__rating--five');
      productElement.querySelector('.stars__rating').classList.add(valueToClassName[item.rating.value]);
      productElement.querySelector('.star__count').textContent = item.rating.number;
      productElement.querySelector('.card__characteristic').textContent = getSugar(item.nutritionFacts.sugar)
      + '. ' +
      item.nutritionFacts.energy
      + ' ккал';
      productElement.querySelector('.card__composition-list').textContent = item.nutritionFacts.contents;
      fragment.appendChild(productElement);

    });
    return fragment;
  };

  window.catalog = {
    setPointerToComposition: setPointerToComposition,
    renderSweetCards: renderSweetCards,
    sweetArray: sweetArray
  };

}());
