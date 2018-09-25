'use strict';
(function () {
  // добавление товара в избранное ----------------------------------------------
  // var favButtons = document.querySelectorAll('.card__btn-favorite');
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
  window.favorites = {
    favoriteToggleHandler: favoriteToggleHandler
  };

}());
