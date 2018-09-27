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
  window.util = {
    debounce: debounce
  };
}());
