const L = require("leaflet");

const orange = L.icon({
  iconUrl: "./images/orange.svg",
  iconSize: [30, 30]
});

const blue = L.icon({
  iconUrl: "./images/blue.svg",
  iconSize: [30, 30]
});

const green = L.icon({
  iconUrl: "./images/green.svg",
  iconSize: [30, 30]
});

const purple = L.icon({
  iconUrl: "./images/purple.svg",
  iconSize: [30, 30]
});

module.exports = {
  blue: blue,
  green: green,
  orange: orange,
  purple: purple
};
