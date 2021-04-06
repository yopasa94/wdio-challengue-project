const suites = require('./config/test_suites.conf');

const runEnv = process.env.RUN_ENV || 'debug';

let capabilities = [
  {
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: ['--headless', '--disable-gpu', 'window-size=2560,1600', '--no-sandbox', '--disable-dev-shm-usage', '--autoplay-policy=no-user-gesture-required'],
    },
    maxInstances: runEnv === 'remote' ? 4 : 1,
  },
];

if (runEnv === 'debug') {
  capabilities = [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['window-size=2560,1600', '--autoplay-policy=no-user-gesture-required'],
      },
      maxInstances: 1,
    },
  ];
}

const DEBUG_RUN_ENV = {
  hostName: '',
  portNumber: 4444,
  servicesList: ['selenium-standalone']
};

const REMOTE_RUN_ENV = {
  hostName: 'seleniumserver.address.com',
  portNumber: 1234,
  servicesList: []
};

const RUN_ENVS = {
  debug: DEBUG_RUN_ENV,
  remote: REMOTE_RUN_ENV,
};

exports.config = {
  hostname: RUN_ENVS[runEnv].hostname,
  port: RUN_ENVS[runEnv].portNumber,
  services: RUN_ENVS[runEnv].servicesList,
  path: '/wd/hub',

  specs: ['./test/features/*.feature'],
  exclude: [],

  suites: suites.testSuites,

  capabilities: capabilities,

  logLevel: 'error',
  reporters: [
    'spec',
    ['junit', {
      outputDir: 'reports/',
      outputFileFormat: function(options) {
        return `wdio-${options.cid}-junit-reporter.xml`
      }
    }]
  ],

  bail: 0,
  baseUrl: 'http://localhost',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  framework: 'cucumber',
  cucumberOpts: {
    require: [
      './test/steps/*.steps.ts',
    ], // <string[]> (file/dir) require files before executing features
    backtrace: false, // <boolean> show full backtrace for errors
    dryRun: false,    // <boolean> invoke formatters without executing steps
    failFast: false,  // <boolean> abort the run on first failure
    snippets: true,   // <boolean> hide step definition snippets for pending steps
    source: true,     // <boolean> hide source uris
    strict: false,    // <boolean> fail if there are any undefined or pending steps
    timeout: runEnv === 'debug' ? (24 * 60 * 60 * 1000) : 20000,   // <number> timeout for step definitions
    ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
    tagExpression: 'not @skip',
  },
};
