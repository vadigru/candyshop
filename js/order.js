'use strict';
(function () {
  // обработка формы платежей -------------------------------------------------
  var payment = document.querySelector('.payment');
  var payMethodToggle = payment.querySelector('.payment__method');
  var payCard = payment.querySelector('#payment__card');
  var creditCard = payment.querySelector('.payment__card-wrap');
  window.creditCardInputs = creditCard.querySelectorAll('input');
  var cash = payment.querySelector('.payment__cash-wrap');
  // --- переключение метода оплаты безнал/кэш --------------------------------
  var payMethodToggleHandler = function () {
    if (payCard.checked === true) {
      creditCard.classList.remove('visually-hidden');
      cash.classList.add('visually-hidden');
      [].forEach.call(window.creditCardInputs, function (item) {
        item.required = true;
      });
    } else {
      creditCard.classList.add('visually-hidden');
      cash.classList.remove('visually-hidden');
      [].forEach.call(window.creditCardInputs, function (item) {
        item.required = false;
      });
    }
  };
  payMethodToggle.addEventListener('click', payMethodToggleHandler);

  // обработка формы доставки -------------------------------------------------
  var delivery = document.querySelector('.deliver');
  var store = delivery.querySelector('#deliver__store');
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
    } else {
      deliveryStore.classList.add('visually-hidden');
      deliveryCourier.classList.remove('visually-hidden');
      [].forEach.call(deliveryInputs, function (item) {
        item.required = true;
      });
      deliveryFloor.required = false;
    }
  };
  deliveryToggle.addEventListener('click', deliveryToggleHandler);
}());
