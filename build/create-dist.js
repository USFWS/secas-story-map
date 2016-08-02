(function () {
  'use strict';

  var mkdirp = require('mkdirp');

  var directories = ['dist/css', 'dist/fonts', 'dist/images', 'dist/js', 'dist/data'];

  directories.forEach( function(dir) {
    mkdirp(dir, catchError);
  });

  function catchError(e) {
    if (e) console.error(e);
  }
})();
