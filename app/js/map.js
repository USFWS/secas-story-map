(function() {
  "use strict";

  var L = require("leaflet");
  var _ = require("./util")._;
  var dom = require("./util").dom;
  var emitter = require("./mediator");
  var icons = require("./icons");

  L.Icon.Default.imagePath = "./images";

  var map, options, geographies, geogLayer;
  var defaults = {
    zoom: 5,
    element: "map"
  };

  function init(opts) {
    options = _.defaults({}, opts, defaults);
    createMap();
    createZoomToFullExtent();
    addBasemap();
    registerHandlers();
    if (options.data) addLayers();
  }

  function registerHandlers() {
    options.fullExtent.addEventListener("click", zoomToFullExtent);
    emitter.on("project:click", displayGeography);
    emitter.on("geographies:loaded", saveGeographies);
  }

  function destroy() {
    options.fullExtent.removeEventListener("click", zoomToFullExtent);
    emitter.off("project:click", displayGeography);
    emitter.off("geographies:loaded", saveGeographies);
  }

  function createMap() {
    map = L.map(options.element, {
      center: options.center,
      zoom: options.zoom
    });
  }

  function createZoomToFullExtent() {
    options.fullExtent = dom.create(
      "button",
      "zoom-to-full-extent",
      document.body
    );
    options.fullExtent.setAttribute("title", "Zoom to full extent");
    options.imgExtent = dom.create(
      "img",
      "full-extent-img",
      options.fullExtent
    );
    options.imgExtent.setAttribute("src", "./images/full-extent.svg");
  }

  function addBasemap() {
    L.tileLayer(
      "http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}",
      {
        attribution:
          'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: "abcd",
        minZoom: 0,
        maxZoom: 18,
        ext: "png"
      }
    ).addTo(map);
  }

  function addLayers() {
    geogLayer = L.layerGroup().addTo(map);

    options.markers = L.geoJson(options.data, {
      onEachFeature: function(feature, layer) {
        layer.on({ click: onMarkerClick });
      }
    }).addTo(map);

    map.fitBounds(options.markers.getBounds(), {
      paddingBottomRight: [0, 300]
    });
  }

  function saveGeographies(geog) {
    geographies = geog;
  }

  function onMarkerClick(e) {
    emitter.emit("project:click", e.target.feature);
  }

  function displayGeography(office) {
    var clientWidth = document.documentElement.clientWidth;
    geogLayer.clearLayers();
    var currentGeog = L.geoJson(geographies, {
      filter: function(feature) {
        return feature.properties.name === office.properties.geography;
      }
    });
    geogLayer.addLayer(currentGeog);

    // Decide if we should make room on the map for the infowindow
    if (clientWidth > 1000)
      map.fitBounds(currentGeog.getBounds(), { paddingBottomRight: [500, 0] });
    else map.fitBounds(currentGeog.getBounds());
    emitter.emit("gallery:close");
  }

  function zoomToFullExtent() {
    map.fitBounds(options.markers.getBounds(), {
      paddingBottomRight: [0, 300]
    });
    emitter.emit("zoomtofullextent");
  }

  module.exports.init = init;
  module.exports.destroy = destroy;
})();
