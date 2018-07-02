(function () {
  "use strict";

  var L = require("leaflet");

  var orange = L.icon({
    iconUrl: "./images/orange.svg",
    iconSize: [30, 30]
  });

  var blue = L.icon({
    iconUrl: "./images/blue.svg",
    iconSize: [30, 30]
  });

  var green = L.icon({
    iconUrl: "./images/green.svg",
    iconSize: [30, 30]
  });

  var purple = L.icon({
    iconUrl: "./images/purple.svg",
    iconSize: [30, 30]
  });

  module.exports = {
    blue: blue,
    green: green,
    orange: orange,
    purple: purple
  };
})();
