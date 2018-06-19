(function() {
  "use strict";

  var parallel = require("async/parallel");

  var map = require("./map");
  var splash = require("./splash");
  var infoWindow = require("./infowindow");
  var about = require("./about");
  var gallery = require("./gallery");
  var data = require("./data-access");
  var emitter = require("./mediator");

  var projects;

  parallel(
    {
      projects: data.getFile.bind(null, "projects"),
      geographies: data.getFile.bind(null, "geographies")
    },
    function(err, results) {
      infoWindow.init();
      about.init();
      splash.init();

      map.init({
        center: [37.174019, -82.604078],
        projects: results.projects,
        geographies: results.geographies
      });

      gallery.init({
        data: results.projects.features
      });
    }
  );
})();
