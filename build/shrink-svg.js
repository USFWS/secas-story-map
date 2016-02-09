(function () {
  'use strict';

  var Imagemin = require('imagemin');
  var imageminSvgo = require('imagemin-svgo');

  new Imagemin()
    .src('app/images/markers/*.svg')
    .dest('dist/images')
    .use(imageminSvgo())
    .run();
})();
