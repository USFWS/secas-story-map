(function() {
  "use strict";

  var L = require("leaflet");
  var esri = require("esri-leaflet");
  var _ = require("./util")._;
  var dom = require("./util").dom;
  var emitter = require("./mediator");

  L.Icon.Default.imagePath = "./images/";

  var map, options, geogLayer, secasBounds;
  var defaults = {
    zoom: 5,
    element: "map"
  };

  var secas = esri.featureLayer({
    url:
      "https://services.arcgis.com/QVENGdaPbd4LUkLV/ArcGIS/rest/services/SECAS_Boundary/FeatureServer/0",
    style: function() {
      return { color: "#368b37", weight: 2 };
    }
  });

  function init(opts) {
    options = _.defaults({}, opts, defaults);
    createMap();
    createZoomToFullExtent();
    addBasemap();
    registerHandlers();
    secasBounds = L.geoJSON(options.secas).getBounds();
    if (options.projects) addLayers();
  }

  function registerHandlers() {
    options.fullExtent.addEventListener("click", zoomToFullExtent);
    emitter.on("project:click", displayGeography);
  }

  function destroy() {
    options.fullExtent.removeEventListener("click", zoomToFullExtent);
    emitter.off("project:click", displayGeography);
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
          "Map tiles by <a href=\"http://stamen.com\">Stamen Design</a>, <a href=\"http://creativecommons.org/licenses/by/3.0\">CC BY 3.0</a> &mdash; Map data &copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>",
        subdomains: "abcd",
        minZoom: 0,
        maxZoom: 18,
        ext: "png"
      }
    ).addTo(map);
  }

  function addLayers() {
    geogLayer = L.layerGroup().addTo(map);

    options.markers = L.geoJson(options.projects, {
      onEachFeature: function(feature, layer) {
        layer.on({ click: onMarkerClick });
      }
    }).addTo(map);

    secas.addTo(map);

    // Center map on SECAS boundary
    secas.once("load", function() {
      var bounds = L.latLngBounds([]);
      secas.eachFeature(function(layer) {
        var layerBounds = layer.getBounds();
        bounds.extend(layerBounds);
      });

      secasBounds = bounds;
      map.fitBounds(bounds);
    });

    // Only show SECAS boundary at certain zoom levels
    map.on("zoomend", function (e) {
      var zoom = e.target.getZoom();
      if (zoom > 6) secas.removeFrom(map);
      else secas.addTo(map);
    });
  }

  function onMarkerClick(e) {
    emitter.emit("project:click", e.target.feature);
  }

  function displayGeography(office) {
    var clientWidth = document.documentElement.clientWidth;
    geogLayer.clearLayers();
    var currentGeog = L.geoJson(options.geographies, {
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
    map.fitBounds(secasBounds, {
      paddingBottomRight: [0, 300]
    });
    emitter.emit("zoomtofullextent");
  }

  module.exports.init = init;
  module.exports.destroy = destroy;
})();
