const path = require('path');

module.exports = {
  entry: {
    index: './src/of-type.js'
  },
  output: {
    filename: 'of-type.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ofType',
    libraryTarget: 'var',
    libraryExport: 'default',
    globalObject: 'this'
  },
  target: 'web'
};