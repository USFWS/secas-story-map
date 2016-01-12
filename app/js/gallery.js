(function () {
  'use strict';

  var imagesLoaded = require('imagesloaded');

  var _ = require('./util')._;
  var template = require('../templates/gallery.jade');
  var emitter = require('./mediator');
  var dom = require('./util').dom;

  var options,
      gallery = false;

  function init(opts) {
    options = opts;
    createGallery();
    render();
    imagesLoaded(options.el, show);
    registerHandlers();
  }

  function createGallery() {
    options.el = dom.create('section', 'gallery-hidden', document.body);
    options.close = dom.create('button', 'gallery-toggle', options.el);
    options.list = dom.create('ul', 'gallery-list', options.el);
    dom.addClass(options.el, 'gallery-container');
    console.log(options);
  }

  function registerHandlers() {
    options.close.addEventListener('click', toggle);
    options.list.addEventListener('click', itemHandler);
  }

  function render() {
    options.list.innerHTML = template({
      galleryItems: options.data
    });
  }

  function show() {
    gallery = true;
    options.el.classList.remove('gallery-hidden');
  }

  function hide() {
    gallery = false;
    options.el.classList.add('gallery-hidden');
  }

  function toggle() {
    if (gallery) {
      gallery = false;
      hide();
    } else {
      gallery = true;
      show();
    }
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
  module.exports.toggle = toggle;
})();
