const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  optimization: {
    minimize: false
  },
  watch: true,
  stats: {
    version: false,
    colors: true,
    warnings: false,
    assets: true,
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    depth: false,
    entrypoints: false,
    errors: true,
    errorDetails: true,
    hash: false,
    modules: false,
    providedExports: false,
    publicPath: false,
    timings: true,
    usedExports: false
  },
  plugins:[
    new UglifyPlugin({
      uglifyOptions:{
        compress:false,
        mangle:false,
        output:{
          ecma:5,
          indent_level:2,
          comments:/^@/,
          beautify:true
        }
      }
    })
  ]
});