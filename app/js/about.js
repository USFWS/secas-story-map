(function () {
  "use strict";

  var dom = require("./util").dom;
  var template = require("../templates/about.jade");
  var emitter = require("./mediator");

  var options = {},
    active = false,
    activeClass = "active";

  function init() {
    createModal();
    registerHandlers();
    render();
  }

  function createModal() {
    options.button = dom.create("button", "about-button", document.body);
    options.modal = dom.create("aside", "about-modal", document.body);
    options.modalContent = dom.create("section", "about-content", options.modal);
    options.close = dom.create("button", "about-close", options.modal);
    options.background = dom.create("div", "about-background", document.body);

    options.button.innerHTML = "About";
    options.button.setAttribute("title", "About this map");
    options.close.innerHTML = "Close";
  }

  function registerHandlers() {
    emitter.on("splash:background", addPhotoCredit);
    options.button.addEventListener("click", toggle);
    options.close.addEventListener("click", toggle);
    options.background.addEventListener("click", hide);
    document.body.addEventListener("keyup", aboutKeyup);
  }

  function aboutKeyup(e) {
    if (e.keyCode === 27 && active) hide();
  }

  function render() {
    options.modalContent.innerHTML = template();
  }

  function show() {
    active = true;
    dom.addClass(options.modal, activeClass);
    dom.addClass(options.background, activeClass);
    emitter.emit("infowindow:close");
  }

  function hide() {
    active = false;
    dom.removeClass(options.modal, activeClass);
    dom.removeClass(options.background, activeClass);
  }

  function toggle() {
    active ? hide() : show(); //jshint ignore:line
  }

  function addPhotoCredit(img) {
    var heading = "<h3>Splash Screen Photo</h3>";
    var caption;
    if (img.full) caption = "<a href=\"" + img.full + "\">" + img.caption + "</a>";
    else caption = "<a href=\"" + img.src + "\">" + img.caption + "</a>";
    options.modalContent.innerHTML += (heading + caption);
  }

  module.exports.init = init;
})();
