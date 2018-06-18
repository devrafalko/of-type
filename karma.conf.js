const webpackConfig = require('./webpack.dev.js');
const specMode = process.env.karma_spec_mode;
module.exports = function(config) {
  config.set({
    basePath: '',
    exclude:[
      'tests/scenarios.js',
    ],
    files: [
      {pattern: 'tests/*.js',watched:true,served:true,included:true}
    ],
    autoWatch: false,
    singleRun:true,
    failOnEmptyTestSuite:false,
    logLevel: config.LOG_WARN, //config.LOG_DISABLE, config.LOG_ERROR, config.LOG_INFO, config.LOG_DEBUG
    frameworks: ['jasmine'],
    browsers: ['Chrome'],
    reporters: ['mocha'],
    listenAddress: '0.0.0.0',
    hostname: 'localhost',
    port: 9876,
    retryLimit:0,
    browserDisconnectTimeout: 5000,
    browserNoActivityTimeout: 10000,
    captureTimeout: 60000,
    client: {
      captureConsole:true,
      clearContext:false,
      runInParent: false,
      useIframe:true,
      jasmine:{
        random: false,
      }
    },
    preprocessors: {
      './tests/*.js': ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },
    mochaReporter: {
      output: specMode  //noFailures, full, autowatch, minimal
    }
  });
};