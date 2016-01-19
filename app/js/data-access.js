(function () {
  'use strict';

  var xhr = require('xhr');
  var emitter = require('./mediator');
  var _ = require('./util')._;

  var projects, geographies;

  function init(path) {
    xhr.get(path, function (err, res) {
      projects = JSON.parse(res.body);
      emitter.emit('projects:loaded', projects);
    });

    xhr.get('./data/geographies.js', function (err, res) {
      geographies = JSON.parse(res.body);
      emitter.emit('geographies:loaded', geographies);
    });
  }

  function getGeographies() {
    return geographies;
  }

  function getProjects() {
    return projects;
  }

  function getProject(projectName) {
    return _.find(projects.features, function (project) {
      return project.properties.title.toLowerCase() === projectName.toLowerCase();
    });
  }

  exports.getProjects = getProjects;
  exports.getProject = getProject;
  exports.getGeographies = getGeographies;
  exports.init = init;

})();
