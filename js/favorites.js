'use strict';
(function () {
  // добавление товара в избранное ----------------------------------------------
  var favoriteToggleHandler = function (evt, i, array) {
    evt.preventDefault();
    var favSelected = document.querySelectorAll('.card__btn-favorite--selected');
    if (!evt.target.classList.contains('card__btn-favorite--selected')) {
      favCount.textContent = '(' + (favSelected.length + 1) + ')';
      evt.target.classList.add('card__btn-favorite--selected');
      array[i].favorite = true;
    } else {
      evt.target.classList.remove('card__btn-favorite--selected');
      favCount.textContent = '(' + (favSelected.length - 1) + ')';
      array[i].favorite = false;
    }
  };

  // --- обнуление счетчика избранных товаров -----------------------------------
  var favCount = document.querySelector('label[for="filter-favorite"]+span');
  favCount.textContent = '(' + 0 + ')';

  var addToFavorites = function (array) {
    var favButtons = document.querySelectorAll('.card__btn-favorite');
    [].forEach.call(favButtons, function (item, i) {
      item.addEventListener('click', function (evt) {
        favoriteToggleHandler(evt, i, array);
      });
    });
  };

  window.favorites = {
    addToFavorites: addToFavorites
  };

}());
