'use strict';
(function () {
  var catalogCards = document.querySelector('.catalog__cards');
  // window.sweetArray = [];

  // обработка успешно загруженных данных -------------------------------------
  var onLoadSuccessHandle = function (data) {
    catalogCards.appendChild(window.renderSweetCards(data));
    var cCards = document.querySelectorAll('.catalog__card');
    var favButtons = document.querySelectorAll('.card__btn-favorite');
    window.cart.addAtribute(cCards, data);
    window.cart.addCart(cCards, data);
    // новый массив из полученного JSON ---------------------------------------
    window.sweetArray = data.map(function (current) {
      return current;
    });

    // data.forEach(function (item) {
    //   window.sweetArray.push(item);
    // });
    // --- слушатель на избранное ---------------------------------------------
    [].forEach.call(favButtons, function (item) {
      item.addEventListener('click', window.favorites.favoriteToggleHandler);
    });
    window.filter.filter();
  };
  // обробатка ошибок при загрузке данных -------------------------------------
  var onLoadErrorHandle = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; text-align: center; background-color: rgba(255, 255, 255, 0.8); color: red; line-height: 50px; padding: 0 25px; border-radius: 10px; border: 1px solid black; cursor: pointer;';
    node.style.position = 'absolute';
    node.style.right = '15px';
    node.style.top = '15px';
    node.style.fontSize = '16px';
    node.classList.add('errorDialog');
    node.textContent = errorMessage;
    catalogCards.insertAdjacentElement('afterbegin', node);

    var nodeIn = document.createElement('div');
    nodeIn.style = 'z-index: 101; color: black; cursor: pointer;';
    nodeIn.style.position = 'absolute';
    nodeIn.style.right = '25px';
    nodeIn.style.top = '20px';
    nodeIn.style.fontSize = '12px';
    nodeIn.classList.add('closeErrorDialog');
    nodeIn.textContent = 'x';
    catalogCards.insertAdjacentElement('afterbegin', nodeIn);
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

}());
