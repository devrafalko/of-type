const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    index:'./src/of-type.js'
  },
  output: {
    filename: 'of-type.node.js',
    path: path.resolve(__dirname, 'dist'),
    library:'ofType',
    libraryTarget: 'commonjs2',
    libraryExport:'default',
    globalObject: 'this'
  },
  target:'node',
  externals: [nodeExternals()]
};