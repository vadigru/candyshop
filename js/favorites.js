'use strict';
(function () {
  // --- обнуление счетчика избранных товаров -----------------------------------
  var favCount = document.querySelector('label[for="filter-favorite"]+span');
  favCount.textContent = '(' + 0 + ')';

  // добавление товара в избранное ----------------------------------------------
  var favCounter = 0;
  var favoriteToggleHandler = function (evt, i, array) {
    evt.preventDefault();
    if (!evt.target.classList.contains('card__btn-favorite--selected') && array[i].favorite === false) {
      evt.target.classList.add('card__btn-favorite--selected');
      array[i].favorite = true;
      favCounter++;
      favCount.textContent = '(' + (favCounter) + ')';


    } else {
      evt.target.classList.remove('card__btn-favorite--selected');
      favCounter--;
      favCount.textContent = '(' + (favCounter) + ')';
      array[i].favorite = false;
    }
  };

  var addToFavorites = function (array) {
    var favButtons = document.querySelectorAll('.card__btn-favorite');
    [].forEach.call(favButtons, function (item, i) {
      item.addEventListener('click', function (evt) {
        favoriteToggleHandler(evt, i, array);
      });
    });
  };

  var arrangeFavorites = function (arr) {
    var favBtnAll = document.querySelectorAll('.card__btn-favorite');
    [].forEach.call(favBtnAll, function (fav, i) {
      if (arr[i].favorite === true) {
        fav.classList.add('card__btn-favorite--selected');
      }
    });
  };

  window.favorites = {
    addToFavorites: addToFavorites,
    arrangeFavorites: arrangeFavorites
  };

}());
