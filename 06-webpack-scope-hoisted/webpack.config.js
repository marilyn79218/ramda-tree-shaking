let path = require("path")
let UglifyJSPlugin = require("uglifyjs-webpack-plugin")
let webpack = require("webpack")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let env = process.env.NODE_ENV
let minifyJS = env == "production"

let basePath = __dirname

module.exports = {
  entry: {
    "index": "./src/index.js",
    // Webpack tree shaking is broke when mutiple entries
    // ref: https://github.com/webpack/webpack/issues/4453
    // "script": "./src/script-2.js"
  },
  output: {
    path: path.join(basePath, "dist"),
    filename: "[name].js",
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    ...(minifyJS ? [new UglifyJSPlugin()] : [])
  ],
}

// // Solution to achieve tree shaking in mutiple entries
// // ref: https://github.com/FormidableLabs/webpack-tree-shaking-multiple-entry-points/blob/master/webpack.config.array.js
// const configGenerator = (entryName, index) => ({
//   entry: {
//     [entryName]: "./src/" + entryName + ".js"
//   },
//   output: {
//     path: path.join(basePath, "dist"),
//     filename: "[name].js",
//   },
//   plugins: [
//     new BundleAnalyzerPlugin({
//       analyzerPort: 8888 + index,
//     }),
//     new webpack.optimize.ModuleConcatenationPlugin(),
//     ...(minifyJS ? [new UglifyJSPlugin()] : [])
//   ],
// });

// module.exports = entryNames.map((entryName, index) => configGenerator(entryName, index));
