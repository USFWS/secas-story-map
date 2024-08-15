const parallel = require("async/parallel");

const map = require("./map");
// const splash = require("./splash");
const infoWindow = require("./infowindow");
const about = require("./about");
const gallery = require("./gallery");
const data = require("./data-access");

parallel(
  {
    projects: data.getFile.bind(null, "projects"),
    geographies: data.getFile.bind(null, "geographies")
  },
  function(err, results) {
    infoWindow.init();
    about.init();
    // splash.init();

    map.init({
      center: [33.477, -86.131],
      projects: results.projects,
      geographies: results.geographies
    });

    gallery.init({
      data: results.projects.features
    });
  }
);
