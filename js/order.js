'use strict';
(function () {
  var payArea = document.querySelector('.payment');
  var payFields = payArea.querySelectorAll('.payment__inputs input');
  var payMethodToggle = payArea.querySelector('.payment__method');
  var payCard = payArea.querySelector('#payment__card');
  var payCreditCard = payArea.querySelector('.payment__card-wrap');
  var payCreditCardNum = payArea.querySelector('#payment__card-number');
  var payCreditCardFields = payCreditCard.querySelectorAll('input');
  var payCash = payArea.querySelector('.payment__cash-wrap');

  var shipmentArea = document.querySelector('.deliver');
  var store = shipmentArea.querySelector('#deliver__store');
  var courier = shipmentArea.querySelector('#deliver__courier');
  var shipmentField = shipmentArea.querySelector('.deliver__entry-fields-wrap');
  var shipmentFields = shipmentField.querySelectorAll('input');
  var shipmentStore = shipmentArea.querySelector('.deliver__store');
  var shipmentCourier = shipmentArea.querySelector('.deliver__courier');
  var shipmentToggle = shipmentArea.querySelector('.deliver__toggle');
  var shipmentFloor = shipmentArea.querySelector('#deliver__floor');

  var popupSuccess = document.querySelector('.modal--success');
  var popupError = document.querySelector('.modal--error');
  var popupValidation = document.querySelector('.modal--validation');

  var submitForm = document.querySelector('.buy form');
  var creditCardStatus = document.querySelector('.payment__card-status');
  var stores = document.querySelectorAll('.deliver__store-list li input');

  var map = document.querySelector('.deliver__store-map-wrap');
  var mapDescription = map.querySelector('p');

  // обработка формы платежей -------------------------------------------------
  // --- переключение метода оплаты безнал/кэш --------------------------------
  var payMethodToggleHandler = function () {
    if (payCard.checked === true) {
      payCreditCard.classList.remove('visually-hidden');
      payCash.classList.add('visually-hidden');
      [].forEach.call(payCreditCardFields, function (item) {
        item.required = true;
      });
      [].forEach.call(payFields, function (item) {
        item.required = true;
        item.disabled = false;
      });
    } else {
      payCreditCard.classList.add('visually-hidden');
      payCash.classList.remove('visually-hidden');
      [].forEach.call(payCreditCardFields, function (item) {
        item.required = false;
      });
      [].forEach.call(payFields, function (item) {
        item.required = false;
        item.disabled = true;
        item.value = '';
      });
    }
  };
  payMethodToggle.addEventListener('click', payMethodToggleHandler);

  // обработка формы доставки -------------------------------------------------
  // --- переключение доставка/самовывоз --------------------------------------
  var shipmentToggleHandler = function () {
    if (store.checked === true) {
      shipmentStore.classList.remove('visually-hidden');
      shipmentCourier.classList.add('visually-hidden');
      [].forEach.call(shipmentFields, function (item) {
        item.required = false;
        item.disabled = true;
      });

    }
    if (courier.checked === true) {
      shipmentStore.classList.add('visually-hidden');
      shipmentCourier.classList.remove('visually-hidden');
      [].forEach.call(shipmentFields, function (item) {
        item.required = true;
        item.disabled = false;
      });
      shipmentFloor.required = false;
    }
  };
  shipmentToggle.addEventListener('click', shipmentToggleHandler);

  // связываем станцию метро и карту ------------------------------------------
  var showMap = function (evt) {
    if (evt.target.value !== '' && typeof evt.target.value !== 'undefined') {
      if (map.contains(mapDescription)) {
        map.removeChild(mapDescription);
      }
      map.querySelector('img').src = './img/map/' + evt.target.value + '.jpg';
    }
  };
  // сбрасываем форму на значения по умолчанию при успешной отправке данных ---
  var formReset = function () {
    var form = document.querySelectorAll('form');
    [].forEach.call(form, function (item) {
      item.reset();
    });
    payMethodToggleHandler();
    shipmentToggleHandler();
  };

  // обработка успешной/не успешной отправки данных на сервер -----------------
  var showSuccess = function () {
    popupSuccess.classList.remove('modal--hidden');
    document.addEventListener('keydown', window.util.onEscClose);
  };

  var showError = function () {
    popupError.classList.remove('modal--hidden');
    document.addEventListener('keydown', window.util.onEscClose);
  };

  var onSubmitSuccessHandle = function () {
    showSuccess();
    formReset();
    window.cart.cartEmpty();
  };

  var onSubmitErrorHandle = function () {
    showError();
  };

  submitForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (payCreditCard.classList.contains('visually-hidden')) {
      window.backend.upload(new FormData(submitForm), onSubmitSuccessHandle, onSubmitErrorHandle);
    }
    if (!payCreditCard.classList.contains('.visually-hidden') && creditCardStatus.textContent === 'Одобрен') {
      window.backend.upload(new FormData(submitForm), onSubmitSuccessHandle, onSubmitErrorHandle);
    }
    if (payCreditCardNum.disabled !== true && creditCardStatus.textContent !== 'Одобрен') {
      popupValidation.classList.remove('modal--hidden');
    }
  });

  [].forEach.call(stores, function (item) {
    item.addEventListener('change', showMap);
  });

}());
