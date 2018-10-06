'use strict';
(function () {
  var payment = document.querySelector('.payment');
  var paymentGroup = payment.querySelectorAll('.payment__inputs input');
  var payMethodToggle = payment.querySelector('.payment__method');
  var payCard = payment.querySelector('#payment__card');
  var creditCard = payment.querySelector('.payment__card-wrap');
  var creditCardInputs = creditCard.querySelectorAll('input');
  var cash = payment.querySelector('.payment__cash-wrap');
  var delivery = document.querySelector('.deliver');
  var store = delivery.querySelector('#deliver__store');
  var courier = delivery.querySelector('#deliver__courier');
  var deliveryField = delivery.querySelector('.deliver__entry-fields-wrap');
  var deliveryInputs = deliveryField.querySelectorAll('input');
  var deliveryStore = delivery.querySelector('.deliver__store');
  var deliveryCourier = delivery.querySelector('.deliver__courier');
  var deliveryToggle = delivery.querySelector('.deliver__toggle');
  var deliveryFloor = delivery.querySelector('#deliver__floor');
  var success = document.querySelector('.modal--success');
  var error = document.querySelector('.modal--error');
  var submitForm = document.querySelector('.buy form');
  var modalValidation = document.querySelector('.modal--validation');
  var cardStatus = document.querySelector('.payment__card-status');

  // обработка формы платежей -------------------------------------------------
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

  // сбрасываем форму на значения по умолчанию при успешной отправке данных ---
  var formReset = function () {
    var form = document.querySelectorAll('form');
    [].forEach.call(form, function (item) {
      item.reset();
    });
    payMethodToggleHandler();
    deliveryToggleHandler();
  };

  // обработка успешной/не успешной отправки данных на сервер -----------------
  var showSuccess = function () {
    success.classList.remove('modal--hidden');
    document.addEventListener('keydown', window.util.onEscClose);
  };

  var showError = function () {
    error.classList.remove('modal--hidden');
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
    if (creditCard.classList.contains('visually-hidden')) {
      window.backend.upload(new FormData(submitForm), onSubmitSuccessHandle, onSubmitErrorHandle);
    }
    if (!creditCard.classList.contains('.visually-hidden') && cardStatus.textContent === 'Одобрен') {
      window.backend.upload(new FormData(submitForm), onSubmitSuccessHandle, onSubmitErrorHandle);
    }
    if (creditCard.value === '' && cardStatus.textContent !== 'Одобрен') {
      modalValidation.classList.remove('modal--hidden');
    }
  });

}());
