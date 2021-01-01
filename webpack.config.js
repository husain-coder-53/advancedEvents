// Imports
const path = require("path");
//
// Config Object
const config = {
  mode: "production",
  watch: false,
  entry: { index: "./src/index.js" },
  output: {
    publicPath: "./",
    path: path.resolve(__dirname, "./dist"),
    chunkFilename: "[id].js",
    libraryTarget: "umd",
    library: "AdvancedEvents",
    filename: "advancedEvents.min.js",
  },
  optimization: {
    minimize: false,
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js/i,
        exclude: /node_modules/i,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              "@babel/plugin-proposal-object-rest-spread",
              "@babel/plugin-syntax-dynamic-import",
            ],
          },
        },
      },
    ],
  },
};
//
// Export Config
module.exports = config;