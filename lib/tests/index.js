const karma = require('karma');
const deferred = require('q').defer();

function run () {
  const karmaConfig = {
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.16.4/lodash.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-animate.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-aria.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-messages.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular-material/1.1.1/angular-material.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.3.1/angular-ui-router.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular-local-storage/0.5.0/angular-local-storage.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.1/moment.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/components/**/index.js',
      'src/components/**/*.service.js',
      'src/index.js',
      'tests/**/*.spec.js'
    ],
    exclude: [
    ],
    preprocessors: {
    },
    reporters: ['nyan'],
    port: 9876,
    colors: true,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  };
  const server = new karma.Server(karmaConfig, (exitCode) => deferred.resolve(exitCode));

  server.start();
  return deferred.promise;
}

module.exports = {
  run: run
};
