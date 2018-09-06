'use strict';

var MAX_CARDS = 26;
var MAX_BASKET_CARDS = 3;
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

/* получаем перемешанный "сладкий" массив, чтобы карточки в корзине покупок ---
повторяли карточки из "сладкого" массива, но были выбраны случайным образом -*/

var getShuffledSweetCards = function (array) {
  var newSweetCards = [];
  for (var i = 1; i < array.length - 1; i++) {
    var newSweetCardItem = array[getRandomNumberInRange(0, MAX_CARDS)];
    newSweetCards.push(newSweetCardItem);
  }
  return newSweetCards;
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
      }
    };
    sweetCards.push(sweetCard);
  }
  return sweetCards;
};

var sweetCards = createSweetArray(MAX_CARDS);
var shuffledSweetCards = getShuffledSweetCards(sweetCards);

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

/* отображаем карточки со сладостями используя данные -------------------------
из "сладкого" массива ------------------------------------------------------ */

var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');
var catalogLoad = catalogCards.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');

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

/* отображаем карточки со сладостями в корзине покупок используя данные -------
из "сладкого" перемешанного массива ---------------------------------------- */

var goodsCards = document.querySelector('.goods__cards');
goodsCards.classList.remove('goods__cards--empty');
var goodsCardEmpty = goodsCards.querySelector('.goods__card-empty');
goodsCardEmpty.classList.add('visually-hidden');

var renderBasketCards = function (sweetData) {
  var fragment = document.createDocumentFragment();
  sweetData.forEach(function (item) {
    var sweetBasketElement = document.querySelector('#card-order').content.cloneNode(true);
    sweetBasketElement.querySelector('.card-order__title').textContent = item.name;
    sweetBasketElement.querySelector('.card-order__img').src = item.picture;
    sweetBasketElement.querySelector('.card-order__price').textContent = item.price + ' ₽';
    fragment.appendChild(sweetBasketElement);
  });
  return fragment;
};

goodsCards.appendChild(renderBasketCards(shuffledSweetCards.splice(0, MAX_BASKET_CARDS)));
