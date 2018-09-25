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
    'gum-cedar.jpg',
    'gum-chile.jpg',
    'gum-eggplant.jpg',
    'gum-mustard.jpg',
    'gum-portwine.jpg',
    'gum-wasabi.jpg',
    'ice-cucumber.jpg',
    'ice-eggplant.jpg',
    'ice-garlic.jpg',
    'ice-italian.jpg',
    'ice-mushroom.jpg',
    'ice-pig.jpg',
    'marmalade-beer.jpg',
    'marmalade-caviar.jpg',
    'marmalade-corn.jpg',
    'marmalade-new-year.jpg',
    'marmalade-sour.jpg',
    'marshmallow-bacon.jpg',
    'marshmallow-beer.jpg',
    'marshmallow-shrimp.jpg',
    'marshmallow-spicy.jpg',
    'marshmallow-wine.jpg',
    'soda-bacon.jpg',
    'soda-celery.jpg',
    'soda-cob.jpg',
    'soda-garlic.jpg',
    'soda-peanut-grapes.jpg',
    'soda-russian.jpg'
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
        'nutritionFacts': {
          'sugar': getRandomSugar(),
          'energy': getRandomNumberInRange(MIN_ENERGY, MAX_ENERGY),
          'contents': getShuffledIngredients(INGREDIENTS)
        },
        // 'count': 1
      };
      sweetCards.push(sweetCard);
    }
    return sweetCards;
  };

  window.sweetCards = createSweetArray(MAX_CARDS);
}());
