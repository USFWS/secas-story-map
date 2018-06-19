const fs = require("fs");
const path = require("path");
const glob = require("glob");
const minify = require("jsonminify");

glob("app/data/*", (err, files) => {
  if (err) console.log(err);
  files.forEach(file => {
    const ext = path.extname(file);
    const outpath = path.join(
      "dist",
      "data",
      path.basename(file).replace(ext, ".js")
    );
    const json = fs.readFileSync(file, "utf8");
    const minifiedData = minify(json);
    fs.writeFileSync(outpath, minifiedData, "utf8", console.log);
  });
});
