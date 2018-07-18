const dom = require("./util").dom;
const template = require("../templates/about");
const emitter = require("./mediator");

const options = {};
const activeClass = "active";
let active = false;

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
  options.close.innerHTML = "&times;";
}

function registerHandlers() {
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
  active ? hide() : show();
}

module.exports.init = init;