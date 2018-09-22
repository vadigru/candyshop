'use strict';
(function () {
  // отображаем карточки со сладостями из массива -------------------------------
  var catalogCards = document.querySelector('.catalog__cards');

  var renderSweetCards = function (sweetData) {
    var fragment = document.createDocumentFragment();
    sweetData.forEach(function (item) {
      var sweetElement = document.querySelector('#card').content.cloneNode(true);
      var cardPrice = sweetElement.querySelector('.card__price');
      var cardCurrency = sweetElement.querySelector('.card__currency');
      var cardWeight = sweetElement.querySelector('.card__weight');
      sweetElement.querySelector('.catalog__card').classList.remove('card--in-stock');
      sweetElement.querySelector('.catalog__card').classList.add(window.util.amountToClass(item.amount));
      sweetElement.querySelector('.card__img').src = item.picture;
      sweetElement.querySelector('.card__title').textContent = item.name;
      sweetElement.querySelector('.card__img').alt = item.name;
      cardPrice.textContent = item.price;
      cardPrice.appendChild(cardCurrency);
      cardPrice.appendChild(cardWeight);
      sweetElement.querySelector('.card__weight').textContent = '/ ' + item.weight + ' Г';
      sweetElement.querySelector('.stars__rating').classList.remove('stars__rating--five');
      sweetElement.querySelector('.stars__rating').classList.add(window.util.valueToStars[item.rating.value]);
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

  catalogCards.appendChild(renderSweetCards(window.sweetCards));
}());
