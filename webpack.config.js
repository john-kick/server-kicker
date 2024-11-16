const path = require("path");

module.exports = {
  entry: "./src/frontend/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public", "js")
  }
};
