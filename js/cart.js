'use strict';
(function () {
  var cartTop = document.querySelector('.main-header__basket');
  var orederArea = document.querySelector('.buy');
  var cartArea = orederArea.querySelector('.goods__cards');
  var emtyCartText = orederArea.querySelector('.goods__card-empty');
  var cartTotalArea = orederArea.querySelector('.goods__total');
  var cartResult = orederArea.querySelector('.goods__total-count');
  var orderButton = orederArea.querySelector('.buy__submit-btn');
  var orderFields = orederArea.querySelectorAll('#order input');
  var creditCardStatus = orederArea.querySelector('.payment__card-status');
  var creditCardFields = orederArea.querySelectorAll('.payment__inputs input');
  var courierField = orederArea.querySelector('#order .deliver__courier input');
  var buyerEmail = orederArea.querySelector('#contact-data__email');
  var totalPrice = 0;
  var totalValue = 0;

  // аттрибуты необходимые для определения уникальности -----------------------
  // товара и количества в наличии --------------------------------------------
  var addAtribute = function (products, data) {
    [].forEach.call(products, function (item, i) {
      item.setAttribute('data-id', getIdName(data[i]));
      item.setAttribute('data-amount', data[i].amount);
    });
  };

  // --- скрываем надпись пустой корзины --------------------------------------
  var showSweetBasketCards = function () {
    cartArea.classList.remove('goods__cards--empty');
    cartTotalArea.classList.remove('visually-hidden');
    emtyCartText.classList.add('visually-hidden');
  };

  // --- показываем надпись пустой корзины ------------------------------------
  var hideSweetBasketCards = function () {
    if (cartArea.children.length > 1) {
      return;
    } else {
      cartArea.classList.add('catalog__cards--load');
      cartTotalArea.classList.add('visually-hidden');
      emtyCartText.classList.remove('visually-hidden');
    }
  };

  // добавление товара в корзину и показать/скрыть состав ---------------------
  var addCart = function (products, data) {
    [].forEach.call(products, function (item, i) {
      item.addEventListener('click', function (evt) {
        evt.preventDefault();
        if (evt.target.classList.contains('card__btn')) {
          if (evt.currentTarget.classList.contains('card--soon')) {
            return;
          }
          addToCart(products[i], data, i);
          enableOrder();
          showSweetBasketCards();
          var cartItems = cartArea.querySelectorAll('article');
          [].forEach.call(cartItems, function (it) {
            it.addEventListener('click', amountIncreaseHandler);
            it.addEventListener('click', amountDecreaseHandler);
            it.addEventListener('click', closeCardHandler);
          });
        }
        // --- показываем/скрываем состав сладости ----------------------------
        if (evt.target.classList.contains('card__btn-composition')) {
          item.querySelector('.card__composition').classList.toggle('card__composition--hidden');
        }
      });
    });
  };

  // --- идентификатор получаемый из имени файла фотографии -------------------
  var getIdName = function (obj) {
    var pathToStroke = obj.picture.split('.').shift();
    var idname = String(pathToStroke);
    return idname;
  };

  // --- управление товаром в корзине -----------------------------------------
  var addToCart = function (target, data, i) {
    var dataAttributeId = cartArea.querySelector('[data-id="' + target.dataset.id + '"]');
    if (dataAttributeId === null) {
      var basketItem = data[i];
      var basketItemElement = document.querySelector('#card-order').content.cloneNode(true);
      basketItemElement.querySelector('.card-order__title').textContent = basketItem.name;
      basketItemElement.querySelector('.card-order__img').src = './img/cards/' + basketItem.picture;
      basketItemElement.querySelector('.card-order__price').textContent = basketItem.price + ' ₽';
      basketItemElement.querySelector('.card-order__count').value = 1;
      basketItemElement.querySelector('.goods_card').setAttribute('data-id', getIdName(data[i]));
      basketItemElement.querySelector('.goods_card').setAttribute('data-amount', data[i].amount);
      cartArea.appendChild(basketItemElement);
      totalPrice += basketItem.price;
      totalValue++;
      arrangeFooterBasket(totalPrice, totalValue);
      arrangeHeaderBasket(totalValue);
    } else {
      var value = dataAttributeId.querySelector('.card-order__count');
      var amount = target.dataset.amount;
      increasePrice(value, amount, data[i].price);
      increaseValue(value, amount);
      arrangeFooterBasket(totalPrice, totalValue);
      arrangeHeaderBasket(totalValue);
    }
  };

  // --- увеличение/уменьшение количества товара в корзине --------------------
  var increasePrice = function (value, amount, price) {
    if (value.value === amount) {
      return;
    }

    totalPrice += price;
    arrangeFooterBasket(totalPrice, totalValue);
    arrangeHeaderBasket(totalValue);
    return;
  };
  var decreasePrice = function (price) {
    totalPrice -= price;
    arrangeFooterBasket(totalPrice, totalValue);
    arrangeHeaderBasket(totalValue);
  };

  // --- увеличиваем/уменьшаем количество добавленных товаров -----------------
  var increaseValue = function (value, amount) {
    if (value.value !== amount) {
      value.value++;
      totalValue++;
      arrangeFooterBasket(totalPrice, totalValue);
      arrangeHeaderBasket(totalValue);
    }
    return;
  };
  var decreaseValue = function (value) {
    value.value--;
    totalValue--;
    arrangeFooterBasket(totalPrice, totalValue);
    arrangeHeaderBasket(totalValue);
    return;
  };

  // --- увеличение кол-ва определенного товара -------------------------------
  var amountIncreaseHandler = function (evt) {
    evt.preventDefault();
    var target = evt.target.closest('.card-order__btn--increase');
    var card = evt.target.closest('.card-order');
    var price = parseInt(card.querySelector('.card-order__price').textContent.split(' ')[0], 10);
    var value = card.querySelector('.card-order__count');
    var amount = card.dataset.amount;
    if (target === null) {
      return;
    }
    increasePrice(value, amount, price);
    increaseValue(value, amount);
  };

  // --- уменьшение кол-ва товара в корзине -----------------------------------
  var amountDecreaseHandler = function (evt) {
    evt.preventDefault();
    var target = evt.target.closest('.card-order__btn--decrease');
    var card = evt.target.closest('.card-order');
    var price = parseInt(card.querySelector('.card-order__price').textContent.split(' ')[0], 10);
    var value = card.querySelector('.card-order__amount .card-order__count');
    if (target === null) {
      return;
    }
    if (value.value > 1) {
      decreaseValue(value);
      decreasePrice(price);
      arrangeHeaderBasket(totalValue);
    } else {
      cartArea.removeChild(card);
      decreasePrice(price);
      if (cartArea.children.length === 1) {
        totalPrice = 0;
        totalValue = 0;
        arrangeHeaderBasket(totalValue);
        arrangeFooterBasket(totalPrice, totalValue);
        hideSweetBasketCards();
        disableOrder();
      }
      if (cartArea.children.length > 1) {
        totalValue--;
        arrangeHeaderBasket(totalValue);
        arrangeFooterBasket(totalPrice, totalValue);
      }
    }
  };

  // --- закрытие карточки товара в корзине на крестик ------------------------
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
      cartArea.removeChild(card);
      if (cartArea.children.length === 1) {
        totalPrice = 0;
        totalValue = 0;
        disableOrder();
        arrangeHeaderBasket(totalValue);
        hideSweetBasketCards();
      }
      if (cartArea.children.length > 1) {
        totalValue -= value.value;
        decreasePrice(price);
        arrangeHeaderBasket(totalValue);
        arrangeFooterBasket(totalPrice, totalValue);
      }
    }
  };

  // очищаем и обнуляем корзину -----------------------------------------------
  var cartEmpty = function () {
    var cartItems = cartArea.querySelectorAll('article');
    [].forEach.call(cartItems, function (item) {
      cartArea.removeChild(item);
    });
    totalPrice = 0;
    totalValue = 0;
    arrangeHeaderBasket(totalValue);
    arrangeFooterBasket(totalPrice, totalValue);
    hideSweetBasketCards();
    disableOrder();
    creditCardStatus.textContent = 'Не определён';
  };

  // --- отображаем информацию о количестве/цене в верхней корзине ------------
  var arrangeHeaderBasket = function (basketValue) {
    var array = basketValue.toString().split('').reverse().map(function (item) {
      return parseInt(item, 10);
    });
    var basketValueNumber = array[0];
    var basketValueNumberSecond = array[1];
    if (array.length === 1 || basketValueNumberSecond === 1) {
      if (basketValue === 0) {
        cartTop.textContent = 'В корзине нет товаров';
      }
      if (basketValue === 1) {
        cartTop.textContent = 'В корзине ' + basketValue + ' товар';
      }
      if (basketValue > 1 && basketValue <= 4) {
        cartTop.textContent = 'В корзине ' + basketValue + ' товара';
      }
      if (basketValue > 4 && basketValue <= 19) {
        cartTop.textContent = 'В корзине ' + basketValue + ' товаров';
      }
    }
    if (array.length > 1 && basketValueNumberSecond !== 1) {
      if (basketValueNumber === 0) {
        cartTop.textContent = 'В корзине ' + basketValue + ' товаров';
      }
      if (basketValueNumber === 1) {
        cartTop.textContent = 'В корзине ' + basketValue + ' товар';
      }
      if (basketValueNumber >= 2 && basketValueNumber <= 4) {
        cartTop.textContent = 'В корзине ' + basketValue + ' товара';
      }
      if (basketValueNumber > 4 && basketValueNumber <= 9) {
        cartTop.textContent = 'В корзине ' + basketValue + ' товаров';
      }
    }
  };

  // --- отображаем информацию о количестве/цене в нижней корзине -------------
  var arrangeFooterBasket = function (obj, basketValue) {
    var array = basketValue.toString().split('').reverse().map(function (item) {
      return parseInt(item, 10);
    });
    var basketValueNumber = array[0];
    var basketValueNumberSecond = array[1];
    if (array.length === 1 || basketValueNumberSecond === 1) {

      if (basketValue === 1) {
        cartResult.textContent = 'Итого за ' + basketValue + ' товар ' + obj + ' ₽';
      }
      if (basketValue > 1 && basketValue <= 4) {
        cartResult.textContent = 'Итого за ' + basketValue + ' товара ' + obj + ' ₽';
      }
      if (basketValue > 4 && basketValue <= 19) {
        cartResult.textContent = 'Итого за ' + basketValue + ' товаров ' + obj + ' ₽';
      }
    }
    if (array.length > 1 && basketValueNumberSecond !== 1) {
      if (basketValueNumber === 0) {
        cartResult.textContent = 'Итого за ' + basketValue + ' товаров ' + obj + ' ₽';
      }
      if (basketValueNumber === 1) {
        cartResult.textContent = 'Итого за ' + basketValue + ' товар ' + obj + ' ₽';
      }
      if (basketValueNumber >= 2 && basketValueNumber <= 4) {
        cartResult.textContent = 'Итого за ' + basketValue + ' товара ' + obj + ' ₽';
      }
      if (basketValueNumber > 4 && basketValueNumber <= 9) {
        cartResult.textContent = 'Итого за ' + basketValue + ' товаров ' + obj + ' ₽';
      }
    }
  };

  // блокируем поля ввода данных ----------------------------------------------
  var disableOrder = function () {
    [].forEach.call(orderFields, function (item) {
      item.disabled = true;
    });
    orderButton.disabled = true;
  };
  disableOrder();

  // разблокируем поля ввода данных, если корзина не пустая -------------------
  var enableOrder = function () {
    [].forEach.call(orderFields, function (item) {
      item.disabled = false;
    });
    [].forEach.call(creditCardFields, function (item) {
      item.required = true;
    });
    [].forEach.call(courierField, function (item) {
      item.required = false;
      item.desabled = true;
    });
    orderButton.disabled = false;
    buyerEmail.required = false;
  };

  window.cart = {
    addCart: addCart,
    addAtribute: addAtribute,
    cartEmpty: cartEmpty
  };

}());
