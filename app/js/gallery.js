(function () {
  'use strict';

  var imagesLoaded = require('imagesloaded');

  var _ = require('./util')._;
  var template = require('../templates/gallery.jade');
  var emitter = require('./mediator');
  var data = require('./data-access');

  var options;
  var defaults = {
    el: document.createElement('section')
  };

  function init(opts) {
    options = _.defaults({}, opts, defaults);
    options.el.classList.add('gallery-hidden', 'gallery-container');
    document.body.appendChild(options.el);
    render();
    imagesLoaded(options.el, show);
    registerHandlers();
  }

  function registerHandlers() {
    var close = document.querySelector('.gallery-toggle');
    close.addEventListener('click', toggle);

    var gallery = options.el.querySelector('.gallery-list');
    gallery.addEventListener('click', itemHandler);
  }

  function render() {
    options.el.innerHTML = template({
      galleryItems: options.data
    });
  }

  function show() {
    options.el.classList.remove('gallery-hidden');
  }

  function hide() {
    options.el.classList.add('gallery-hidden');
  }

  function toggle() {
    options.el.classList.toggle('gallery-hidden');
  }

  function itemHandler(e) {
    var el = e.target;
    var projectName;
    while (el && el.tagName !== 'LI') {
       el = el.parentNode;
    }
    projectName = el.getAttribute('data-name');
    emitter.emit('project:click', data.getProject(projectName));
  }

  module.exports.init = init;
  module.exports.show = show;
  module.exports.hide = hide;
})();
