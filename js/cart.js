'use strict';
(function () {
  var catalogCards = document.querySelector('.catalog__cards');
  var catalogLoad = catalogCards.querySelector('.catalog__load');
  var catalogCardsAll = document.querySelectorAll('.catalog__card');

  // аттрибуты необходимые для определения уникальности -------------------------
  // товара и количества в наличии ----------------------------------------------
  var addAtribute = function () {
    for (var i = 0; i < catalogCardsAll.length; i++) {
      catalogCardsAll[i].setAttribute('data-id', i + 1);
      catalogCardsAll[i].setAttribute('data-name', window.sweetCards[i].amount);
    }
  };
  addAtribute();

  // скрываем надпись пустого каталога ------------------------------------------
  var showSweetCards = function () {
    catalogCards.classList.remove('catalog__cards--load');
    catalogLoad.classList.add('visually-hidden');
  };
  showSweetCards();

  // надписи корзины ------------------------------------------------------------
  var goodsWrap = document.querySelector('.goods__card-wrap');
  var goodsCards = document.querySelector('.goods__cards');
  var goodsCardEmpty = goodsCards.querySelector('.goods__card-empty');
  var goodsCardTotal = goodsWrap.querySelector('.goods__total');

  // --- скрываем надпись пустой корзины ----------------------------------------
  var showSweetBasketCards = function () {
    goodsCards.classList.remove('goods__cards--empty');
    goodsCardTotal.classList.remove('visually-hidden');
    goodsCardEmpty.classList.add('visually-hidden');
  };

  // --- показываем надпись пустой корзины --------------------------------------
  var hideSweetBasketCards = function () {
    if (goodsCards.children.length > 1) {
      return;
    } else {
      goodsCards.classList.add('catalog__cards--load');
      goodsCardTotal.classList.add('visually-hidden');
      goodsCardEmpty.classList.remove('visually-hidden');
    }
  };

  // добавление товара в корзину ------------------------------------------------
  [].forEach.call(catalogCardsAll, function (item, i) {
    item.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (evt.target.classList.contains('card__btn')) {
        if (evt.currentTarget.classList.contains('card--soon')) {
          return;
        }
        addToCart(catalogCardsAll[i], i);
        enableOrder();
        showSweetBasketCards();
        var goodsCardsAll = goodsCards.querySelectorAll('article');
        [].forEach.call(goodsCardsAll, function (it) {
          it.addEventListener('click', amountIncreaseHandler);
          it.addEventListener('click', amoutDecreaseHandler);
          it.addEventListener('click', closeCardHandler);
        });
      }
      // --- показываем/скрываем состав сладости --------------------------------
      if (evt.target.classList.contains('card__btn-composition')) {
        item.querySelector('.card__composition').classList.toggle('card__composition--hidden');
      }
    });
  });

  // --- идентификатор получаемый из имени файла фотографии ---------------------
  // --- только не помню зачем мне это было нужно -------------------------------
  var getIdName = function (obj) {
    var pathToStroke = obj.picture.split('.').reverse();
    var idname = String(pathToStroke[1]).split('/')[2];
    return idname;
  };

  // --- управление товаром в корзине -------------------------------------------
  var totalPrice = 0;
  var totalValue = 0;
  var addToCart = function (target, i) {
    var dataAttributeId = goodsCards.querySelector('[data-id="' + target.dataset.id + '"]');
    if (dataAttributeId === null) {
      var cardsBasket = window.sweetCards[i];
      var cardBasketElement = document.querySelector('#card-order').content.cloneNode(true);
      cardBasketElement.querySelector('.card-order__title').textContent = cardsBasket.name;
      cardBasketElement.querySelector('.card-order__img').src = cardsBasket.picture;
      cardBasketElement.querySelector('.card-order__price').textContent = cardsBasket.price + ' ₽';
      cardBasketElement.querySelector('.card-order__count').value = 1;
      cardBasketElement.querySelector('.card-order__count').name = getIdName(window.sweetCards[i]);
      cardBasketElement.querySelector('.card-order__count').id = '#card-order__' + getIdName(window.sweetCards[i]);
      cardBasketElement.querySelector('.goods_card').setAttribute('data-id', i + 1);
      cardBasketElement.querySelector('.goods_card').setAttribute('data-name', window.sweetCards[i].amount);
      goodsCards.appendChild(cardBasketElement);
      totalPrice += cardsBasket.price;
      totalValue++;
      arrangeFooterBasket(totalPrice, totalValue);
      arrangeHeaderBasket(totalValue);
    } else {
      var value = dataAttributeId.querySelector('.card-order__count');
      var amount = target.dataset.name;

      increasePrice(value, amount, window.sweetCards[i].price);
      increaseValue(value, amount);
    }
  };

  // --- увеличение/уменьшение количества товара в корзине ----------------------
  var goodsPrice = goodsCardTotal.querySelector('.goods__total-count');
  var increasePrice = function (value, amount, price) {
    var basketCards = document.querySelectorAll('.goods_card .card-order__price');
    if (value.value === amount) {
      return;
    }
    totalPrice += price;
    arrangeFooterBasket(totalPrice, basketCards.length);
    return;
  };
  var decreasePrice = function (price) {
    var basketCards = document.querySelectorAll('.goods_card .card-order__price');
    totalPrice -= price;
    arrangeFooterBasket(totalPrice, basketCards.length);
  };

  // --- увеличиваем/уменьшаем количество добавленных товаров -------------------
  var increaseValue = function (value, amount) {
    if (value.value !== amount) {
      value.value++;
    }
    return;
  };
  var decreaseValue = function (value) {
    return value.value--;
  };

  // --- увеличение кол-ва определенного товара ---------------------------------
  var amountIncreaseHandler = function (evt) {
    evt.preventDefault();
    var target = evt.target.closest('.card-order__btn--increase');
    var card = evt.target.closest('.card-order');
    var price = parseInt(card.querySelector('.card-order__price').textContent.split(' ')[0], 10);
    var value = card.querySelector('.card-order__count');
    var amount = card.dataset.name;
    if (target === null) {
      return;
    }
    increasePrice(value, amount, price);
    increaseValue(value, amount);
  };

  // --- уменьшение кол-ва товара в корзине -------------------------------------
  var amoutDecreaseHandler = function (evt) {
    evt.preventDefault();
    var target = evt.target.closest('.card-order__btn--decrease');
    var card = evt.target.closest('.card-order');
    var price = parseInt(card.querySelector('.card-order__price').textContent.split(' ')[0], 10);
    var value = card.querySelector('.card-order__amount .card-order__count');
    if (target === null) {
      return;
    } else if (value.value > 1) {
      totalValue--;
      decreaseValue(value);
      decreasePrice(price);
    } else {
      goodsCards.removeChild(card);
      decreasePrice(price);
      if (goodsCards.children.length === 1) {
        totalPrice = 0;
        totalValue = 0;
        arrangeHeaderBasket(totalValue);
        hideSweetBasketCards();
      }
      if (goodsCards.children.length > 1) {
        totalValue--;
        arrangeHeaderBasket(totalValue);
      }
      disableOrder();
    }
  };

  // --- закрытие карточки товара в корзине на крестик ------------------------------
  var closeCardHandler = function (evt) {
    evt.preventDefault();
    var target = evt.target.closest('.card-order__close');
    var card = evt.target.closest('.card-order');
    var price = parseInt(card.querySelector('.card-order__price').textContent.split(' ')[0], 10);
    var value = card.querySelector('.card-order__amount .card-order__count');
    price = price * value.value;
    if (target === null) {
      return;
    } else {
      goodsCards.removeChild(card);
      if (goodsCards.children.length === 1) {
        totalPrice = 0;
        totalValue = 0;
        disableOrder();
        arrangeHeaderBasket(totalValue);
        hideSweetBasketCards();
      }
      if (goodsCards.children.length > 1) {
        totalValue--;
        decreaseValue(value);
        decreasePrice(price);
        arrangeHeaderBasket(totalValue);
      }
    }
  };

  // --- отображаем информацию о количестве/цене в верхней корзине --------------
  var arrangeHeaderBasket = function (basketValue) {
    var headerBasket = document.querySelector('.main-header__basket');
    var array = basketValue.toString().split('').reverse().map(function (item) {
      return parseInt(item, 10);
    });
    var basketValueNumber = array[0];
    var basketValueNumberSecond = array[1];
    if (array.length === 1 || basketValueNumberSecond === 1) {
      if (basketValue === 0) {
        headerBasket.textContent = 'В корзине нет товаров';
      }
      if (basketValue === 1) {
        headerBasket.textContent = 'В корзине ' + basketValue + ' товар';
      }
      if (basketValue > 1 && basketValue <= 4) {
        headerBasket.textContent = 'В корзине ' + basketValue + ' товара';
      }
      if (basketValue > 4 && basketValue <= 19) {
        headerBasket.textContent = 'В корзине ' + basketValue + ' товаров';
      }
    }
    if (array.length > 1 && basketValueNumberSecond !== 1) {
      if (basketValueNumber === 0) {
        headerBasket.textContent = 'В корзине ' + basketValue + ' товаров';
      }
      if (basketValueNumber === 1) {
        headerBasket.textContent = 'В корзине ' + basketValue + ' товар';
      }
      if (basketValueNumber >= 2 && basketValueNumber <= 4) {
        headerBasket.textContent = 'В корзине ' + basketValue + ' товара';
      }
      if (basketValueNumber > 4 && basketValueNumber <= 9) {
        headerBasket.textContent = 'В корзине ' + basketValue + ' товаров';
      }
    }
  };

  // --- отображаем информацию о количестве/цене в нижней корзине ---------------
  var arrangeFooterBasket = function (obj, basketValue) {
    var array = basketValue.toString().split('').reverse().map(function (item) {
      return parseInt(item, 10);
    });
    var basketValueNumber = array[0];
    var basketValueNumberSecond = array[1];
    if (array.length === 1 || basketValueNumberSecond === 1) {

      if (basketValue === 1) {
        goodsPrice.textContent = 'Итого за ' + basketValue + ' товар ' + obj + ' ₽';
      }
      if (basketValue > 1 && basketValue <= 4) {
        goodsPrice.textContent = 'Итого за ' + basketValue + ' товара ' + obj + ' ₽';
      }
      if (basketValue > 4 && basketValue <= 19) {
        goodsPrice.textContent = 'Итого за ' + basketValue + ' товаров ' + obj + ' ₽';
      }
    }
    if (array.length > 1 && basketValueNumberSecond !== 1) {
      if (basketValueNumber === 0) {
        goodsPrice.textContent = 'Итого за ' + basketValue + ' товаров ' + obj + ' ₽';
      }
      if (basketValueNumber === 1) {
        goodsPrice.textContent = 'Итого за ' + basketValue + ' товар ' + obj + ' ₽';
      }
      if (basketValueNumber >= 2 && basketValueNumber <= 4) {
        goodsPrice.textContent = 'Итого за ' + basketValue + ' товара ' + obj + ' ₽';
      }
      if (basketValueNumber > 4 && basketValueNumber <= 9) {
        goodsPrice.textContent = 'Итого за ' + basketValue + ' товаров ' + obj + ' ₽';
      }
    }
  };

  // блокируем поля ввода данных ------------------------------------------------
  var orderButton = document.querySelector('.buy__submit-btn');
  var disableOrder = function () {
    var orderInputs = document.querySelectorAll('#order input');
    [].forEach.call(orderInputs, function (item) {
      item.disabled = true;
    });
    orderButton.disabled = true;
  };
  disableOrder();
  // разблокируем поля ввода данных, если корзина не пустая ---------------------
  var enableOrder = function () {
    var orderInputs = document.querySelectorAll('#order input');
    [].forEach.call(orderInputs, function (item) {
      item.disabled = false;
    });
    [].forEach.call(window.creditCardInputs, function (item) {
      item.required = true;
    });
    orderButton.disabled = false;
  };

}());
