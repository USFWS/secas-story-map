const L = require("leaflet");
const esri = require("esri-leaflet");
const _ = require("./util")._;
const dom = require("./util").dom;
const emitter = require("./mediator");

L.Icon.Default.imagePath = "./images/";

let map;
let options;
let geogLayer;
let initialBounds;
const defaults = {
  zoom: 5,
  element: "map"
};

const secas = esri.featureLayer({
  url:
    "https://services.arcgis.com/QVENGdaPbd4LUkLV/arcgis/rest/services/SECAS_Boundary/FeatureServer/0",
  style: () => ({ color: "#368b37", weight: 2 })
});

function init(opts) {
  options = _.defaults({}, opts, defaults);
  initialBounds = L.geoJSON(opts.projects).getBounds();
  createMap(initialBounds);
  createZoomToFullExtent();
  addBasemap();
  registerHandlers();
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

function createMap(bounds) {
  map = L.map(options.element);
  map.fitBounds(bounds, { paddingBottomRight: [0, 200] });
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
    "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",
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
    onEachFeature: (feature, layer) => {
      layer.on({ click: onMarkerClick });
    }
  }).addTo(map);

  secas.addTo(map);

  // Center map on SECAS boundary
  // secas.once("load", () =>  {
  //   const bounds = L.latLngBounds([]);
  //   secas.eachFeature(layer => {
  //     const layerBounds = layer.getBounds();
  //     bounds.extend(layerBounds);
  //   });

  //   secasBounds = bounds;
  //   map.fitBounds(bounds, { padding: [0, 50] });
  // });

  // Only show SECAS boundary at certain zoom levels
  map.on("zoomend", e => {
    const zoom = e.target.getZoom();
    if (zoom > 6) secas.removeFrom(map);
    else secas.addTo(map);
  });
}

function onMarkerClick(e) {
  emitter.emit("project:click", e.target.feature);
}

function displayGeography(office) {
  const clientWidth = document.documentElement.clientWidth;
  geogLayer.clearLayers();
  const currentGeog = L.geoJson(options.geographies, {
    filter: (feature) => feature.properties.name === office.properties.geography
  });
  geogLayer.addLayer(currentGeog);

  // Decide if we should make room on the map for the infowindow
  if (clientWidth > 1000)
    map.fitBounds(currentGeog.getBounds(), { paddingBottomRight: [0, 300] });
  else map.fitBounds(currentGeog.getBounds());
  emitter.emit("gallery:close");
}

function zoomToFullExtent() {
  map.flyToBounds(initialBounds, {
    paddingBottomRight: [0, 200]
  });
  emitter.emit("zoomtofullextent");
}

module.exports.init = init;
module.exports.destroy = destroy;
