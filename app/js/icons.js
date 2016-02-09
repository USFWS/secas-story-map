(function () {
  'use strict';

  var L = require('leaflet');

  var red = L.icon({
    iconUrl: '../images/red.svg',
    iconSize: [30, 30]
  });

  var blue = L.icon({
    iconUrl: '../images/blue.svg',
    iconSize: [30, 30]
  });

  var green = L.icon({
    iconUrl: '../images/green.svg',
    iconSize: [30, 30]
  });

  var black = L.icon({
    iconUrl: '../images/black.svg',
    iconSize: [30, 30]
  });

  module.exports = {
    red: red,
    blue: blue,
    green: green,
    black: black
  };
})();
