'use strict';

(function () {
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
  var MIN_INGREDIENT = 2;
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

  // генерируем "сладкий" массив с данными для карточек со сладостями ----------
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

  window.sweetCards = createSweetArray(MAX_CARDS);
}());
