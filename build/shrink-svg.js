const imagemin = require("imagemin");
const imageminSvgo = require("imagemin-svgo");

const output = "dist/images/";

imagemin(["app/images/markers/*.svg"], output, {
  use: [imageminSvgo()]
}).catch(console.log);
