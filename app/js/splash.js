(function () {
  'use strict';

  var store = require('store');

  var dom = require('./util').dom;
  var _ = require('./util')._;
  var template = require('../templates/splash.jade');

  var backgrounds = [
    {
      "src": "../images/splash-photos/lake-mattamuskeet-sunset.gif",
      "caption": "Lake Mattamuskeet National Wildlife Refuge at sunset. Photo: Keith Ramos; USFWS"
    }
  ];

  var options = {};
  var activeClass = 'active';
  var active = true;

  function init() {
    options.splash = dom.create('aside', 'splash-screen', document.body);
    dom.addClass(options.splash, activeClass);
    options.splash.innerHTML = template();
    options.background = dom.create('div', 'splash-background', document.body);
    dom.addClass(options.background, activeClass);
    options.close = dom.create('button', 'splash-close', options.splash);
    options.close.innerHTML = 'Close';
    options.checkbox = document.querySelector('.dont-show-again');
    if ( store.get('disableSplashScreen') ) close();
    registerHandlers();
    randomImage();
  }

  function randomImage() {
    var img = _.random(backgrounds);
    var splash = document.querySelector('.splash-screen.active');
    splash.style.backgroundImage = 'url(' + img.src + ')';
    // Emit the background image so we can include photo credit in the About page
  }

  function setLocalStorage() {
    if (options.checkbox.checked) store.set('disableSplashScreen', true);
    else store.set('disableSplashScreen', true);
  }

  function registerHandlers() {
    options.close.addEventListener('click', close);
    options.checkbox.addEventListener('click', setLocalStorage);
    options.background.addEventListener('click', close);
  }

  function destroy() {
    options.close.removeEventListener('click', close);
    options.background.removeEventListener('click', close);
  }

  function close() {
    active = false;
    dom.removeClass(options.splash, activeClass);
    dom.removeClass(options.background, activeClass);
  }

  function open() {
    active = true;
    dom.addClass(options.splash, activeClass);
    dom.addClass(options.background, activeClass);
  }

  function toggle() {
    active ? close() : open(); //jshint ignore:line
  }

  module.exports.init = init;
  module.exports.open = open;
  module.exports.close = close;
  module.exports.destroy = destroy;
})();
