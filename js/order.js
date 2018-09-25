'use strict';
(function () {
  // обработка формы платежей -------------------------------------------------
  var payment = document.querySelector('.payment');
  var paymentGroup = payment.querySelectorAll('.payment__inputs input');
  var payMethodToggle = payment.querySelector('.payment__method');
  var payCard = payment.querySelector('#payment__card');
  var creditCard = payment.querySelector('.payment__card-wrap');
  var creditCardInputs = creditCard.querySelectorAll('input');
  var cash = payment.querySelector('.payment__cash-wrap');
  // --- переключение метода оплаты безнал/кэш --------------------------------
  var payMethodToggleHandler = function () {
    if (payCard.checked === true) {
      creditCard.classList.remove('visually-hidden');
      cash.classList.add('visually-hidden');
      [].forEach.call(creditCardInputs, function (item) {
        item.required = true;
      });
      [].forEach.call(paymentGroup, function (item) {
        item.required = true;
        item.disabled = false;
      });
    } else {
      creditCard.classList.add('visually-hidden');
      cash.classList.remove('visually-hidden');
      [].forEach.call(creditCardInputs, function (item) {
        item.required = false;
      });
      [].forEach.call(paymentGroup, function (item) {
        item.required = false;
        item.disabled = true;
        item.value = '';
      });
    }
  };
  payMethodToggle.addEventListener('click', payMethodToggleHandler);

  // обработка формы доставки -------------------------------------------------
  var delivery = document.querySelector('.deliver');
  var store = delivery.querySelector('#deliver__store');
  var courier = delivery.querySelector('#deliver__courier');
  var deliveryField = delivery.querySelector('.deliver__entry-fields-wrap');
  var deliveryInputs = deliveryField.querySelectorAll('input');
  var deliveryStore = delivery.querySelector('.deliver__store');
  var deliveryCourier = delivery.querySelector('.deliver__courier');
  var deliveryToggle = delivery.querySelector('.deliver__toggle');
  var deliveryFloor = delivery.querySelector('#deliver__floor');
  // --- переключение доставка/самовывоз --------------------------------------
  var deliveryToggleHandler = function () {
    if (store.checked === true) {
      deliveryStore.classList.remove('visually-hidden');
      deliveryCourier.classList.add('visually-hidden');
      [].forEach.call(deliveryInputs, function (item) {
        item.required = false;
      });

    }
    if (courier.checked === true) {
      deliveryStore.classList.add('visually-hidden');
      deliveryCourier.classList.remove('visually-hidden');
      [].forEach.call(deliveryInputs, function (item) {
        item.required = true;
      });
      deliveryFloor.required = false;
    }
  };
  deliveryToggle.addEventListener('click', deliveryToggleHandler);

  // обработка успешной/не успешной отправки данных на сервер -----------------
  var modal = document.querySelectorAll('.modal');
  var modalClose = document.querySelectorAll('.modal__close');
  var success = document.querySelector('.modal--success');
  var error = document.querySelector('.modal--error');
  var submitForm = document.querySelector('.buy form');

  var showSuccess = function () {
    success.classList.remove('modal--hidden');
    document.addEventListener('keydown', onEscClose);
  };

  var showError = function () {
    error.classList.remove('modal--hidden');
    document.addEventListener('keydown', onEscClose);
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
    window.backend.upload(new FormData(submitForm), onSubmitSuccessHandle, onSubmitErrorHandle);
  });

  // закрытие модального окна возникающего при ошибках соединения -------------
  var smallErrorDialogClose = function (evt) {
    var catalogCards = document.querySelector('.catalog__cards');
    var target = evt.target;
    var div = catalogCards.querySelector('.closeErrorDialog');
    var divNested = catalogCards.querySelector('.errorDialog');
    if (target.className === 'errorDialog' || target.className === 'closeErrorDialog') {
      catalogCards.removeChild(div);
      catalogCards.removeChild(divNested);
    }
    document.removeEventListener('click', smallErrorDialogClose);
  };

  document.addEventListener('click', smallErrorDialogClose);

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
    if (evt.keyCode === 27) {
      action();
    }
  };

  [].forEach.call(modalClose, function (item) {
    item.addEventListener('click', modalHide);
  });

  // сбрасываем форму на значения по умолчанию при успешной отправке данных ---
  var formReset = function () {
    var form = document.querySelectorAll('form');
    [].forEach.call(form, function (item) {
      item.reset();
    });
  };

}());
