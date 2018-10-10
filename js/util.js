'use strict';
(function () {
  var UPDATE_INTERVAL = 500;
  var lastTimeout;
  var modal = document.querySelectorAll('.modal');
  var modalClose = document.querySelectorAll('.modal__close');

  // устранение эффекта дребезжания -------------------------------------------
  var debounce = function (evt) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(function () {
      window.filter.filter(evt);
    }, UPDATE_INTERVAL);
  };

  // закрытие модального окна -------------------------------------------------
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
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      action();
    }
  };

  [].forEach.call(modalClose, function (item) {
    item.addEventListener('click', modalHide);
  });

  window.util = {
    onEscClose: onEscClose,
    debounce: debounce,
    ESC_KEYCODE: 27
  };
}());
