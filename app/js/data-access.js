(function() {
  "use strict";

  var xhr = require("xhr");
  var _ = require("./util")._;

  var data = {};

  function getFile(filename, cb) {
    var path = "./data/" + filename + ".js";
    xhr.get(path, function(err, res) {
      if (err) return cb(err);
      if (res.statusCode >= 400)
        return cb(
          new Error("An error occurred with status code" + res.statusCode)
        );
      var result = JSON.parse(res.body);
      data[filename] = result;
      return cb(null, result);
    });
  }

  function getProject(projectName) {
    return _.find(data.projects.features, function(project) {
      return (
        project.properties.title.toLowerCase() === projectName.toLowerCase()
      );
    });
  }

  exports.getFile = getFile;
  exports.getProject = getProject;
})();
