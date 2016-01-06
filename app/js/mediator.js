(function () {
  'use strict';

  var EventEmitter = require('events').EventEmitter,
      pubsub = new EventEmitter();

  function on(name, cb) {
    pubsub.on(name, cb);
  }

  function emit(name, data) {
    pubsub.emit(name, data);
  }

  module.exports.on = on;
  module.exports.emit = emit;

})();
