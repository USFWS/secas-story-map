const store = require("store");

const dom = require("./util").dom;
const template = require("../templates/splash");

const options = {};
const activeClass = "active";

function init() {
  options.splash = dom.create("aside", "splash-screen", document.body);
  dom.addClass(options.splash, activeClass);
  options.splash.innerHTML = template();
  options.background = dom.create("div", "splash-background", document.body);
  dom.addClass(options.background, activeClass);
  options.close = dom.create("button", "splash-close", options.splash);
  options.close.innerHTML = "&times;";
  options.checkbox = options.splash.querySelector(".dont-show-again");
  if (store.get("disableSplashScreen")) close();
  registerHandlers();
}

function setLocalStorage() {
  if (options.checkbox.checked) store.set("disableSplashScreen", true);
  else store.set("disableSplashScreen", true);
}

function registerHandlers() {
  options.close.addEventListener("click", close);
  options.checkbox.addEventListener("click", setLocalStorage);
  options.background.addEventListener("click", close);
}

function destroy() {
  options.close.removeEventListener("click", close);
  options.background.removeEventListener("click", close);
}

function close() {
  dom.removeClass(options.splash, activeClass);
  dom.removeClass(options.background, activeClass);
}

function open() {
  dom.addClass(options.splash, activeClass);
  dom.addClass(options.background, activeClass);
}

module.exports.init = init;
module.exports.open = open;
module.exports.close = close;
module.exports.destroy = destroy;