(function () {
  'use strict';
  var sharp = require('sharp');
  var mkdirp = require('mkdirp');
  var fs = require('fs');

  var input = 'app/images/project-photos/';
  var output = 'dist/images/photos/';
  var images = fs.readdirSync(input);

  // If there's a DS Store item, remove it
  var i = images.indexOf('.DS_Store');
  if (i > -1) images.splice(i,1);

  // Ensure the output dir exists
  mkdirp(output + 'thumbnail', function (err) {
    if (err) console.error(err);
    images.forEach(function (name) {
      var img = sharp(input + name);
      img
        .resize(175,125)
        .toFile(output + 'thumbnail/' + name);
      img
        .resize(600, null)
        .toFile(output + name);
    });
  });
})();
