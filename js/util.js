'use strict';
(function () {
  var UPDATE_INTERVAL = 500;
  var lastTimeout;
  var debounce = function (f) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(f, UPDATE_INTERVAL);
  };

  // закрытие модального окна -------------------------------------------------
  var modal = document.querySelectorAll('.modal');
  var modalClose = document.querySelectorAll('.modal__close');
  var modalHide = function () {
    [].forEach.call(modal, function (item) {
      item.classList.add('modal--hidden');
    });
  };

  var modalEscHide = function () {
    [].forEach.call(modal, function (item) {
      item.classList.add('modal--hidden');
    });
    document.removeEventListener('keydown', onEscClose);
  };

  var onEscClose = function (evt) {
    isEscEvent(evt, modalEscHide);
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === 27) {
      action();
    }
  };

  [].forEach.call(modalClose, function (item) {
    item.addEventListener('click', modalHide);
  });

  window.util = {
    onEscClose: onEscClose,
    debounce: debounce
  };
}());
