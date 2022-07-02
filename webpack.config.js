const path = require("path")
const webpackNodeExternals = require("webpack-node-externals")

module.exports = {
  entry: {
    server: "./index.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  target: "node",
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        // translate from ES6 to ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
}
