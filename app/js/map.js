(function () {
  'use strict';

  var L = require('leaflet');
  var randomColor = require('randomcolor');
  var _ = require('./util')._;
  var emitter = require('./mediator');

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
    emitter.on('project:click', handleProjectClick);
    emitter.on('geographies:loaded', saveGeographies);
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

  function addLayers() {
    geogLayer = L.layerGroup().addTo(map);

    var markers = L.geoJson(options.data, {
      onEachFeature: function(feature, layer) {
        layer.on({ click: onMarkerClick });
      }
    }).addTo(map);

    map.fitBounds(markers.getBounds());
  }

  function saveGeographies(geog) {
    geographies = geog;
  }

  // function addLayer(geojson, popupContent) {
  //   var lccs = L.geoJson(geojson, {
  //     onEachFeature: function(feature, layer) {
  //       layer.bindPopup(feature.properties[popupContent] + " LCC");
  //     },
  //     style: function() {
  //       return { color: randomColor() };
  //     }
  //   }).addTo(map);
  //   map.fitBounds(lccs.getBounds());
  // }

  function onMarkerClick(e) {
    emitter.emit('project:click', e.target.feature);
  }

  function handleProjectClick(office) {
    displayGeography(office.properties.geography);
    flyToOffice(office);
  }

  function displayGeography(geography) {
    geogLayer.clearLayers();
    var currentGeog = L.geoJson(geographies, {
      filter: function (feature) {
        console.log(feature.properties.name, geography);
        return feature.properties.name === geography;
      }
    });
    geogLayer.addLayer(currentGeog);
    console.log(geogLayer);
  }

  function flyToOffice(office) {
    // Clone array, reverse order for Leaflet
    var coords = office.geometry.coordinates.slice(0).reverse();
    map.flyTo(coords);
  }

  module.exports.init = init;
})();
