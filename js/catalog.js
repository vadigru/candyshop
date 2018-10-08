'use strict';
(function () {
  var main = document.querySelector('main');
  var catalogCards = main.querySelector('.catalog__cards');
  var catalogLoad = catalogCards.querySelector('.catalog__load');
  var filterBar = main.querySelector('.catalog__sidebar');
  var inputBtns = filterBar .querySelectorAll('.input-btn__label');
  var rangeBtns = filterBar.querySelectorAll('.range__btn');
  var showAllBtn = filterBar.querySelector('.catalog__submit');
  var error = document.querySelector('.modal--error');

  // поменять курсор с default на pointer -------------------------------------
  [].forEach.call(inputBtns, function (item) {
    item.style.cursor = 'pointer';
  });

  [].forEach.call(rangeBtns, function (item) {
    item.style.cursor = 'pointer';
  });

  showAllBtn.style.cursor = 'pointer';

  var setPointerToComposition = function () {
    var compositionBtns = catalogCards.querySelectorAll('.card__btn-composition');
    [].forEach.call(compositionBtns, function (item) {
      item.style.cursor = 'pointer';
    });
  };
  // скрываем надпись пустого каталога ----------------------------------------
  var showSweetCards = function () {
    catalogCards.classList.remove('catalog__cards--load');
    catalogLoad.classList.add('visually-hidden');
  };

  // обработка успешно загруженных данных -------------------------------------
  var onLoadSuccessHandle = function (data) {
    window.sweetArray = data.map(function (current) {
      return current;
    });
    window.sweetArray.forEach(function (item) {
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
    catalogCards.appendChild(window.renderSweetCards(window.sweetArray));
    var cCards = catalogCards.querySelectorAll('.catalog__card');
    window.cart.addAtribute(cCards, window.sweetArray);
    window.cart.addCart(cCards, window.sweetArray);
    window.favorites.addToFavorites(window.sweetArray);
    window.filter.kindCount();
    showSweetCards();
    setPointerToComposition();
  };

  // обробатка ошибок при загрузке данных -------------------------------------
  var closeErrorHandler = function (evt) {
    var nodeIn = main.querySelector('.closeErrorDialog');
    var node = main.querySelector('.errorDialog');
    if (evt.keyCode === 27) {
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
  window.renderSweetCards = function (sweetData) {
    var fragment = document.createDocumentFragment();
    sweetData.forEach(function (item) {
      var sweetElement = document.querySelector('#card').content.cloneNode(true);
      var cardPrice = sweetElement.querySelector('.card__price');
      var cardCurrency = sweetElement.querySelector('.card__currency');
      var cardWeight = sweetElement.querySelector('.card__weight');
      sweetElement.querySelector('.catalog__card').classList.remove('card--in-stock');
      sweetElement.querySelector('.catalog__card').classList.add(amountToClassName(item.amount));
      sweetElement.querySelector('.card__img').src = './img/cards/' + item.picture;
      sweetElement.querySelector('.card__title').textContent = item.name;
      sweetElement.querySelector('.card__img').alt = item.name;
      cardPrice.textContent = item.price;
      cardPrice.appendChild(cardCurrency);
      cardPrice.appendChild(cardWeight);
      sweetElement.querySelector('.card__weight').textContent = '/ ' + item.weight + ' Г';
      sweetElement.querySelector('.stars__rating').classList.remove('stars__rating--five');
      sweetElement.querySelector('.stars__rating').classList.add(valueToClassName[item.rating.value]);
      sweetElement.querySelector('.star__count').textContent = item.rating.number;
      sweetElement.querySelector('.card__characteristic').textContent = getSugar(item.nutritionFacts.sugar)
      + '. ' +
      item.nutritionFacts.energy
      + ' ккал';
      sweetElement.querySelector('.card__composition-list').textContent = item.nutritionFacts.contents;
      fragment.appendChild(sweetElement);

    });
    return fragment;
  };

  window.catalog = {
    setPointerToComposition: setPointerToComposition
  };

}());
