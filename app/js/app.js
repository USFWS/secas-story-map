(function () {
  'use strict';

  var map = require('./map');
  var splash = require('./splash');
  var infoWindow = require('./infowindow');
  var about = require('./about');
  var gallery = require('./gallery');
  var data = require('./data-access');
  var emitter = require('./mediator');

  var projects;

  data.init('./data/projects.js');

  infoWindow.init();
  about.init();
  splash.init();

  emitter.on('projects:loaded', function (projectData) {
    projects = projectData;

    map.init({
      element: 'map',
      center: [37.174019, -82.604078],
      data: projects
    });

    gallery.init({
      data: projects.features
    });

  });

})();
