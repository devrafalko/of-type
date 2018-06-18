const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: false
  },
  watch:false,
  stats: false,
  plugins:[
    new UglifyPlugin({
      uglifyOptions:{
        compress:true,
        mangle:true,
        output:{
          ecma:5,
          indent_level:2,
          comments:false,
          beautify:false
        }
      }
    })
  ]
});