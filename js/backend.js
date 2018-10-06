'use strict';

(function () {
  var UPLOAD_URL = 'https://js.dump.academy/candyshop';
  var LOAD_URL = 'https://js.dump.academy/candyshop/data';
  var SERVER_TIME = 10000;
  var Code = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  };

  // обработка успешного/не успешного запроса ---------------------------------
  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === Code.OK) {
        onLoad(xhr.response);
      } else if (xhr.status === Code.BAD_REQUEST) {
        onError('Неправильный запрос: ' + xhr.status);
      } else if (xhr.status === Code.NOT_FOUND) {
        onError('Ничего не найдено: ' + xhr.status);
      } else if (xhr.status === Code.INTERNAL_SERVER_ERROR) {
        onError('Внутренняя ошибка сервера: ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения.');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс.');
    });

    xhr.timeout = SERVER_TIME;

    return xhr;
  };

  // загрузка данных с сервера ------------------------------------------------
  var load = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  // выгрузка данных на сервер ------------------------------------------------
  var upload = function (data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
}());
