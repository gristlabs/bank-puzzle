/* eslint-env node */

const path = require('path');

module.exports = (env, argv) => {
  return {
    target: 'web',
    mode: argv.mode,
    entry: {
      index: "./build/app/index.js",
      bankPage: "./build/app/bankPage.js",
    },
    output: {
      filename: "[name].js",
      sourceMapFilename: "[file].map",
      path: path.resolve("./docs"),
    },
    devtool: "source-map",
    resolve: {
      modules: [
        path.resolve('./build'),
        path.resolve('./node_modules')
      ],
    },
    watchOptions: {
      // Only the built files in ./build matter; ignore the sources and the large node_modules.
      ignored: ['app', 'test', 'node_modules'],
    },
    stats: {
      modules: false,
      colors: true,
    },
    module: {
      rules: [
        { test: /\.js$/,
          use: ["source-map-loader"],
          enforce: "pre"
        }
      ]
    },
  };
};
