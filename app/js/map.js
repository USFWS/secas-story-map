(function () {
  'use strict';

  var L = require('leaflet');
  var randomColor = require('randomcolor');
  var _ = require('./util')._;
  var emitter = require('./mediator');
  var icons = require('./icons');

  L.Icon.Default.imagePath = './images';

  var map, options, geographies, geogLayer;
  var defaults = {
    zoom: 5,
    element: 'map'
  };

  function init(opts) {
    options = _.defaults({}, opts, defaults);
    createMap();
    addBasemap();
    registerHandlers();
    if (options.data) addLayers();
  }

  function registerHandlers() {
    emitter.on('project:click', displayGeography);
    emitter.on('geographies:loaded', saveGeographies);
  }

  function createMap() {
    map = L.map(options.element, {
      center: options.center,
      zoom: options.zoom
    });
  }

  function addBasemap() {
    L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png').addTo(map);
  }

  function addLayers() {
    geogLayer = L.layerGroup().addTo(map);

    var markers = L.geoJson(options.data, {
      onEachFeature: function(feature, layer) {
        layer.on({ click: onMarkerClick });
      },
      pointToLayer: function (feature, latlng) {
        var props = feature.properties;
        switch(props.theme) {
          case 'Smart Planning':
            return L.marker(latlng, { icon: icons.orange });
          case 'Building on Existing Partnerships':
            return L.marker(latlng, { icon: icons.blue });
          case 'Saving Dollars and Improving Efficiencies':
            return L.marker(latlng, { icon: icons.green });
          case 'Achieving Conservation':
            return L.marker(latlng, { icon: icons.purple });
        }
      }
    }).addTo(map);

    map.fitBounds(markers.getBounds(), { paddingBottomRight: [0, 300]});
  }

  function saveGeographies(geog) {
    geographies = geog;
  }

  function onMarkerClick(e) {
    emitter.emit('project:click', e.target.feature);
  }

  function displayGeography(office) {
    var clientWidth = document.documentElement.clientWidth;
    geogLayer.clearLayers();
    var currentGeog = L.geoJson(geographies, {
      filter: function (feature) {
        return feature.properties.name === office.properties.geography;
      }
    });
    geogLayer.addLayer(currentGeog);

    // Decide if we should make room on the map for the infowindow
    if (clientWidth > 1000)
      map.fitBounds(currentGeog.getBounds(), { paddingBottomRight: [500, 0]});
    else
      map.fitBounds(currentGeog.getBounds());
    emitter.emit('gallery:close');
  }

  module.exports.init = init;
})();
