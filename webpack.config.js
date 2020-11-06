const path = require("path");
module.exports = {
  entry: [
    "./js/utils.js",
    "./js/timeout.js",
    "./js/success.js",
    "./js/mistake.js",
    "./js/backend.js",
    "./js/comments.js",
    "./js/gallery.js",
    "./js/file-choser.js",
    "./js/validation.js",
    "./js/drag-and-drop.js",
    "./js/photo-filter.js",
    "./js/zoom-photo.js",
    "./js/editing.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
