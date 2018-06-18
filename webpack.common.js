const path = require('path');

module.exports = {
  entry: {
    index:'./src/index.js'
  },
  output: {
    filename: 'of-type.min.js',
    path: path.resolve(__dirname, 'prod'),
    library:'ofType',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude:/(node_modules)/,
        loader:'babel-loader',
        options:{
          presets:['env']
        }
      }
    ]
  }
};