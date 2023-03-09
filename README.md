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
Use right nodeVersion

``` nvm use 14.16.0```

Spin up webdriver-manger

```
  webdriver-manager update
  webdriver-manager start
```
To run specific `.feature` file you can use one of the following command:
```bash
npm run test-spec /test/features/test_feature.feature
```
