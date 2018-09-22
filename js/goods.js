'use strict';

var MAX_CARDS = 26;
var MIN_AMOUNT = 0;
var MAX_AMOUNT = 20;
var MIN_PRICE = 100;
var MAX_PRICE = 1500;
var MIN_WEIGHT = 30;
var MAX_WEIGHT = 300;
var MIN_VALUE = 1;
var MAX_VALUE = 5;
var MIN_NUMBER = 10;
var MAX_NUMBER = 900;
var MIN_ENERGY = 70;
var MAX_ENERGY = 500;
var MIN_INGREDIENT = 1;
var MAX_INGREDIENT = 18;

var SWEETS = [
  'Чесночные сливки',
  'Огуречный педант',
  'Молочная хрюша',
  'Грибной шейк',
  'Баклажановое безумие',
  'Паприколу итальяно',
  'Нинзя-удар васаби',
  'Хитрый баклажан',
  'Горчичный вызов',
  'Кедровая липучка',
  'Корманный портвейн',
  'Чилийский задира',
  'Беконовый взрыв',
  'Арахис vs виноград',
  'Сельдерейная душа',
  'Початок в бутылке',
  'Чернющий мистер чеснок',
  'Раша федераша',
  'Кислая мина',
  'Кукурузное утро',
  'Икорный фуршет',
  'Новогоднее настроение',
  'С пивком потянет',
  'Мисс креветка',
  'Бесконечный взрыв',
  'Невинные винные',
  'Бельгийское пенное',
  'Острый язычок'
];
var INGREDIENTS = [
  'молоко',
  'сливки',
  'вода',
  'пищевой краситель',
  'патока',
  'ароматизатор бекона',
  'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному',
  'ароматизатор картофеля',
  'лимонная кислота',
  'загуститель',
  'эмульгатор',
  'консервант: сорбат калия',
  'посолочная смесь: соль, нитрит натрия',
  'ксилит',
  'карбамид',
  'вилларибо',
  'виллабаджо'
];

var PICTURES = [
  'img/cards/gum-cedar.jpg',
  'img/cards/gum-chile.jpg',
  'img/cards/gum-eggplant.jpg',
  'img/cards/gum-mustard.jpg',
  'img/cards/gum-portwine.jpg',
  'img/cards/gum-wasabi.jpg',
  'img/cards/ice-cucumber.jpg',
  'img/cards/ice-eggplant.jpg',
  'img/cards/ice-garlic.jpg',
  'img/cards/ice-italian.jpg',
  'img/cards/ice-mushroom.jpg',
  'img/cards/ice-pig.jpg',
  'img/cards/marmalade-beer.jpg',
  'img/cards/marmalade-caviar.jpg',
  'img/cards/marmalade-corn.jpg',
  'img/cards/marmalade-new-year.jpg',
  'img/cards/marmalade-sour.jpg',
  'img/cards/marshmallow-bacon.jpg',
  'img/cards/marshmallow-beer.jpg',
  'img/cards/marshmallow-shrimp.jpg',
  'img/cards/marshmallow-spicy.jpg',
  'img/cards/marshmallow-wine.jpg',
  'img/cards/soda-bacon.jpg',
  'img/cards/soda-celery.jpg',
  'img/cards/soda-cob.jpg',
  'img/cards/soda-garlic.jpg',
  'img/cards/soda-peanut-grapes.jpg',
  'img/cards/soda-russian.jpg'
];

var valueToStars = {
  1: 'stars__rating--one',
  2: 'stars__rating--two',
  3: 'stars__rating--three',
  4: 'stars__rating--four',
  5: 'stars__rating--five'
};

// функции для получения случайных значений ----------------------------------
var getRandomNumber = function () {
  return Math.round(Math.random());
};

var getRandomNumberInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomSugar = function () {
  var sugar = '';
  if (getRandomNumber() === 0) {
    sugar = 'без сахара';
    return sugar;
  } else {
    sugar = 'содержит сахар';
    return sugar;
  }
};

// перемешиваем массивы в случайном порядке ------------------------------------
var getShuffledArray = function (array, count) {
  var j;
  var x;
  for (var i = count - 1; i > 0; i--) {
    j = getRandomNumberInRange(0, i);
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
};

var getShuffledIngredients = function (array) {
  var ingredientsArray = [];
  for (var i = 1; i < getRandomNumberInRange(MIN_INGREDIENT, MAX_INGREDIENT); i++) {
    var ingredientItem = array[getRandomNumberInRange(MIN_INGREDIENT, MAX_INGREDIENT)];
    ingredientsArray.push(ingredientItem);
  }
  return ingredientsArray.join(', ');
};

// генерируем "сладкие" массивы с данными для карточек со сладостями ----------
var createSweetArray = function (amount) {
  var sweetCards = [];
  var sweetCard = {};
  var pics = getShuffledArray(PICTURES, amount);
  var names = getShuffledArray(SWEETS, amount);
  for (var i = 0; i < amount; i++) {
    sweetCard = {
      'name': names[i],
      'picture': pics[i],
      'amount': getRandomNumberInRange(MIN_AMOUNT, MAX_AMOUNT),
      'price': getRandomNumberInRange(MIN_PRICE, MAX_PRICE),
      'weight': getRandomNumberInRange(MIN_WEIGHT, MAX_WEIGHT),
      'rating': {
        'value': getRandomNumberInRange(MIN_VALUE, MAX_VALUE),
        'number': getRandomNumberInRange(MIN_NUMBER, MAX_NUMBER),
      },
      'nutrition_facts': {
        'sugar': getRandomSugar(),
        'energy': getRandomNumberInRange(MIN_ENERGY, MAX_ENERGY),
        'content': getShuffledIngredients(INGREDIENTS)
      },
      'count': 1
    };
    sweetCards.push(sweetCard);
  }
  return sweetCards;
};

var sweetCards = createSweetArray(MAX_CARDS);

// переводим числовое значение в класс ----------------------------------------
var amountToClass = function (amount) {
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

// отображаем карточки со сладостями из массива -------------------------------
var catalogCards = document.querySelector('.catalog__cards');
var catalogLoad = catalogCards.querySelector('.catalog__load');

var renderSweetCards = function (sweetData) {
  var fragment = document.createDocumentFragment();
  sweetData.forEach(function (item) {
    var sweetElement = document.querySelector('#card').content.cloneNode(true);
    var cardPrice = sweetElement.querySelector('.card__price');
    var cardCurrency = sweetElement.querySelector('.card__currency');
    var cardWeight = sweetElement.querySelector('.card__weight');
    sweetElement.querySelector('.catalog__card').classList.remove('card--in-stock');
    sweetElement.querySelector('.catalog__card').classList.add(amountToClass(item.amount));
    sweetElement.querySelector('.card__img').src = item.picture;
    sweetElement.querySelector('.card__title').textContent = item.name;
    sweetElement.querySelector('.card__img').alt = item.name;
    cardPrice.textContent = item.price;
    cardPrice.appendChild(cardCurrency);
    cardPrice.appendChild(cardWeight);
    sweetElement.querySelector('.card__weight').textContent = '/ ' + item.weight + ' Г';
    sweetElement.querySelector('.stars__rating').classList.remove('stars__rating--five');
    sweetElement.querySelector('.stars__rating').classList.add(valueToStars[item.rating.value]);
    sweetElement.querySelector('.star__count').textContent = item.rating.number;
    sweetElement.querySelector('.card__characteristic').textContent = item.nutrition_facts.sugar
                                                                    + '. ' +
                                                                    item.nutrition_facts.energy
                                                                    + ' ккал';
    sweetElement.querySelector('.card__composition-list').textContent = item.nutrition_facts.content;
    fragment.appendChild(sweetElement);
  });
  return fragment;
};

catalogCards.appendChild(renderSweetCards(sweetCards));

var catalogCardsAll = document.querySelectorAll('.catalog__card');

// аттрибуты необходимые для определения уникальности -------------------------
// товара и количества в наличии ----------------------------------------------
var addAtribute = function () {
  for (var i = 0; i < catalogCardsAll.length; i++) {
    catalogCardsAll[i].setAttribute('data-id', i + 1);
    catalogCardsAll[i].setAttribute('data-name', sweetCards[i].amount);
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

// добавление товара в избранное ----------------------------------------------
var favButtons = document.querySelectorAll('.card__btn-favorite');
var favoriteToggleHandler = function (evt) {
  evt.preventDefault();
  var favSelected = document.querySelectorAll('.card__btn-favorite--selected');
  if (!evt.target.classList.contains('card__btn-favorite--selected')) {
    evt.target.classList.add('card__btn-favorite--selected');
    favCount.textContent = '(' + (favSelected.length + 1) + ')';
  } else {
    evt.target.classList.remove('card__btn-favorite--selected');
    favCount.textContent = '(' + (favSelected.length - 1) + ')';
  }
};

// --- обнуление счетчика избранных товаров -----------------------------------
var favCount = document.querySelector('label[for="filter-favorite"]+span');
favCount.textContent = '(' + 0 + ')';

// --- слушатель на избранное -------------------------------------------------
[].forEach.call(favButtons, function (item) {
  item.addEventListener('click', favoriteToggleHandler);
});

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
    var cardsBasket = sweetCards[i];
    var cardBasketElement = document.querySelector('#card-order').content.cloneNode(true);
    cardBasketElement.querySelector('.card-order__title').textContent = cardsBasket.name;
    cardBasketElement.querySelector('.card-order__img').src = cardsBasket.picture;
    cardBasketElement.querySelector('.card-order__price').textContent = cardsBasket.price + ' ₽';
    cardBasketElement.querySelector('.card-order__count').value = 1;
    cardBasketElement.querySelector('.card-order__count').name = getIdName(sweetCards[i]);
    cardBasketElement.querySelector('.card-order__count').id = '#card-order__' + getIdName(sweetCards[i]);
    cardBasketElement.querySelector('.goods_card').setAttribute('data-id', i + 1);
    cardBasketElement.querySelector('.goods_card').setAttribute('data-name', sweetCards[i].amount);
    goodsCards.appendChild(cardBasketElement);
    totalPrice += cardsBasket.price;
    totalValue++;
    arrangeFooterBasket(totalPrice, totalValue);
    arrangeHeaderBasket(totalValue);
  } else {
    var value = dataAttributeId.querySelector('.card-order__count');
    var amount = target.dataset.name;

    increasePrice(value, amount, sweetCards[i].price);
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

// разблокируем поля ввода данных, если корзина не пустая ---------------------
var enableOrder = function () {
  var orderInputs = document.querySelectorAll('#order input');
  [].forEach.call(orderInputs, function (item) {
    item.disabled = false;
  });
  [].forEach.call(creditCardInputs, function (item) {
    item.required = true;
  });
  orderButton.disabled = false;
};
disableOrder();

// обработка формы платежей ---------------------------------------------------
var payment = document.querySelector('.payment');
var payMethodToggle = payment.querySelector('.payment__method');
var payCard = payment.querySelector('#payment__card');
var creditCard = payment.querySelector('.payment__card-wrap');
var creditCardInputs = creditCard.querySelectorAll('input');
var cash = payment.querySelector('.payment__cash-wrap');
var payMethodToggleHandler = function () {
  if (payCard.checked === true) {
    creditCard.classList.remove('visually-hidden');
    cash.classList.add('visually-hidden');
    [].forEach.call(creditCardInputs, function (item) {
      item.required = true;
    });
  } else {
    creditCard.classList.add('visually-hidden');
    cash.classList.remove('visually-hidden');
    [].forEach.call(creditCardInputs, function (item) {
      item.required = false;
    });
  }
};
payMethodToggle.addEventListener('click', payMethodToggleHandler);

// обработка формы доставки ---------------------------------------------------
var delivery = document.querySelector('.deliver');
var store = delivery.querySelector('#deliver__store');
var deliveryField = delivery.querySelector('.deliver__entry-fields-wrap');
var deliveryInputs = deliveryField.querySelectorAll('input');
var deliveryStore = delivery.querySelector('.deliver__store');
var deliveryCourier = delivery.querySelector('.deliver__courier');
var deliveryToggle = delivery.querySelector('.deliver__toggle');
var deliveryFloor = delivery.querySelector('#deliver__floor');
var deliveryToggleHandler = function () {
  if (store.checked === true) {
    deliveryStore.classList.remove('visually-hidden');
    deliveryCourier.classList.add('visually-hidden');
    [].forEach.call(deliveryInputs, function (item) {
      item.required = false;
    });
  } else {
    deliveryStore.classList.add('visually-hidden');
    deliveryCourier.classList.remove('visually-hidden');
    [].forEach.call(deliveryInputs, function (item) {
      item.required = true;
    });
    deliveryFloor.required = false;
  }
};
deliveryToggle.addEventListener('click', deliveryToggleHandler);


// валидация карты ------------------------------------------------------------
var cardNumber = payment.querySelector('#payment__card-number');
var cardDate = payment.querySelector('#payment__card-date');
var cardCvc = payment.querySelector('#payment__card-cvc');
var cardHolder = payment.querySelector('#payment__cardholder');
// --- валидация карты по алгоритму луна --------------------------------------
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
