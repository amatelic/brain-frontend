/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'brain',
    environment: environment,
    podModulePrefix: 'brain/pods',
    baseURL: '/',
    locationType: 'auto',
    contentSecurityPolicy : {
      'connect-src': "'self' http://brain.app"
    },
    "ember-simple-auth": {
      // authenticationRoute: 'login',
      // routeAfterInvalidation: 'login',
      authorizationHeaderName: 'Authorization',
      headers: {
        headers: { 'Access-Control-Allow-Origin': '*' },
      }
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    backend: {
      url: 'http://localhost:5000/api', //'http://brain.app/api'
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
