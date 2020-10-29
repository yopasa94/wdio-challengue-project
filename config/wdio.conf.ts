/// <reference path="../global.d.ts"/>
/// <reference types="webdriverio"/>

import { testSuites } from './test_suites.conf';

const runEnv = process.env.RUN_ENV || 'debug';

let capabilities: Array<WebdriverIO.DesiredCapabilities> = [
  {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--headless', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--autoplay-policy=no-user-gesture-required']
    },
    maxInstances: 4,
  },
];

if (runEnv === 'debug') {
  capabilities = [
    {
      browserName: 'chrome',
      chromeOptions: {
        args: ['window-size=2560,1600', '--autoplay-policy=no-user-gesture-required']
      },
      maxInstances: 1,
    },
  ];
}

interface IRunEnv {
  hostName: string;
  portNumber: number;
  servicesList: Array<string>;
}

interface IRunEnvs {
  debug: IRunEnv;
  remote: IRunEnv;
}

const DEBUG_RUN_ENV: IRunEnv = {
  hostName: '',
  portNumber: 4444,
  servicesList: ['selenium-standalone']
};

const REMOTE_RUN_ENV: IRunEnv = {
  hostName: 'seleniumserver.address.com',
  portNumber: 1234,
  servicesList: []
};

const RUN_ENVS: IRunEnvs = {
  debug: DEBUG_RUN_ENV,
  remote: REMOTE_RUN_ENV,
};

let execArgv = [];

export const config: WebdriverIO.Config = {
  // ==================
  // Specify Test Files
  // ==================
  specs: ['./test/features/*.feature'],

  // define specific suites
  suites: testSuites,

  // Patterns to exclude.
  exclude: [],

  // ============
  // Capabilities
  // ============
  capabilities,

  // ===================
  // Test Configurations
  // ===================
  baseUrl: 'http://localhost',
  sync: true,
  logLevel: 'error',
  deprecationWarnings: true,
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  // Test runner services
  host: RUN_ENVS[runEnv].hostName,
  port: RUN_ENVS[runEnv].portNumber,
  services: RUN_ENVS[runEnv].servicesList,
  path: '/wd/hub',

  reporters: ['spec', 'junit'],
  reporterOptions: {
    junit: {
      outputDir: 'reports/'
    }
  },

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
    compiler: ['ts:ts-node/register'],
    tagExpression: 'not @skip',
  },
  execArgv,

  before() {
    var chai = require('chai');
    global.expect = chai.expect;
    chai.Should();

    return Promise.resolve();
  },
  after() {
    browser.pause(1000);
  },
  afterSession() {
    browser.close();
  },
};
