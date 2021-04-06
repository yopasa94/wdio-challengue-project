# Project description
This repository contains a basic configuration and structure to write tests using:
- [WebdriverIO v.7](https://webdriver.io/) 
- [Cucumber](https://docs.cucumber.io)
- [TypeScript](https://www.typescriptlang.org/)

To run test you have to have installed:
- [Node.js](https://nodejs.org/en/) (version at least v12.16.1 or higher)
- [JDK](https://www.oracle.com/technetwork/java/javase/overview/index.html) (version 8 or higher).

To run below commands and with additional variables you have to configure some elements: data, locators, steps, etc. 

### Commands
To run all tests with default values (on prod environment) you can use one of below commands:
```bash
npm test
```

To run specific `.feature` file you can use one of the following command:
```bash
npm run test-spec /test/features/test_feature.feature
```

To run specific `test suite` you can use on of the following command:
```bash
npm run test-suite testSuiteName
```

### Variables
You can define some additional variables to specify how tests should be performed:
- `RUN_ENV` - which selenium server should be used [debug, remote] (default: debug)
  - debug option is used for local debugging (tests run on local selenium server)
  - remote option is prepared for running local tests on remote selenium server (which should be prepared)
- `ENV` - environment on which tests will be run [development, production] (default: production)
