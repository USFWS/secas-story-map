const imagesLoaded = require("imagesloaded");

const dom = require("./util").dom;
const emitter = require("./mediator");
const template = require("../templates/detail");

const options = {};
let visible = false;

function init() {
  createWindow();
  registerHandlers();
}

function createWindow() {
  options.container = dom.create(
    "aside",
    "info-window-container",
    document.body
  );
  options.content = dom.create(
    "section",
    "info-window-content",
    options.container
  );
  options.toggle = dom.create(
    "button",
    "info-window-toggle",
    options.container
  );
  options.toggle.setAttribute("aria-label", "Close");
  options.toggle.innerHTML = "&times;";
}

function registerHandlers() {
  document.body.addEventListener("keydown", keydownHandler);
  options.toggle.addEventListener("click", toggle);
  emitter.on("project:click", render);
  emitter.on("zoomtofullextent", hide);
}

function keydownHandler(e) {
  // Close the infowindow if the user hits escape
  if (visible && e.keyCode === 27) hide();
}

function show() {
  dom.addClass(options.container, "active");
  visible = true;
  emitter.emit("infowindow:open", true);
}

function hide() {
  dom.removeClass(options.container, "active");
  visible = false;
  emitter.emit("infowindow:close", true);
}

function toggle() {
  visible ? hide() : show();
}

function render(project) {
  imagesLoaded(options.content, show);
  options.content.innerHTML = template(project.properties);
}

module.exports.init = init;
module.exports.show = show;
module.exports.hide = hide;
module.exports.toggle = toggle;
