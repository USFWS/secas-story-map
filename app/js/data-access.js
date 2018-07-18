const xhr = require("xhr");
const _ = require("./util")._;

const data = {};

function getFile(filename, cb) {
  var path = "./data/" + filename + ".js";
  xhr.get(path, function(err, res) {
    if (err) return cb(err);
    if (res.statusCode >= 400)
      return cb(
        new Error(`An error occurred with status code ${res.statusCode}`)
      );
    const result = JSON.parse(res.body);
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
