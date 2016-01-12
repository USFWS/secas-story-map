(function () {
  'use strict';

  var L = require('leaflet');
  var randomColor = require('randomcolor');
  var _ = require('./util')._;
  var emitter = require('./mediator');

  L.Icon.Default.imagePath = './images';

  var map, options;
  var defaults = {
    zoom: 5,
    element: 'map'
  };

  function init(opts) {
    options = _.defaults({}, opts, defaults);
    createMap();
    addBasemap();
    registerHandlers();
    if (options.data) addMarkers();
  }

  function registerHandlers() {
    emitter.on('project:click', flyToOffice);
  }

  function createMap() {
    map = L.map(options.element, {
      center: options.center,
      zoom: options.zoom
    });
  }

  function addBasemap() {
    L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
    	attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  }

  function addMarkers() {
    var markers = L.geoJson(options.data, {
      onEachFeature: function(feature, layer) {
        layer.on({ click: onMarkerClick });
      }
    }).addTo(map);
  }

  function addLayer(geojson, popupContent) {
    var lccs = L.geoJson(geojson, {
      onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties[popupContent] + " LCC");
      },
      style: function() {
        return { color: randomColor() };
      }
    }).addTo(map);
    map.fitBounds(lccs.getBounds());
  }

  function onMarkerClick(e) {
    emitter.emit('project:click', e.target.feature);
  }

  function flyToOffice(office) {
    // Clone array, reverse order for Leaflet
    var coords = office.geometry.coordinates.slice(0).reverse();
    map.flyTo(coords);
  }

  module.exports.init = init;
  module.exports.addLayer = addLayer;
})();
