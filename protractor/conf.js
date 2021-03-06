﻿exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance
  capabilities: {
    // browser to run test with
    'browserName': 'chrome',
    'chromeOptions': {
      // get rid of --ignore-certificate yellow warning
      args: ['--no-sandbox', 'test-type=browser'],
      // set download path and avoid prompting for download even though
      // even though this is already the default Chrome but for completeness
      prefs: {
        'download': {
          'prompt_for_download': false,
          'default_directory': 'c:/temp/'
        }
      }
    }
  },

  // Spec patterns are relative to the current working directory when protractor is called
  specs: ['mixed_validation_spec.js', 'dynamic_spec.js', 'full_tests_spec.js'],
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 550000
  },
  allScriptsTimeout: 550000,
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // format the output when tests are run with Team City
  onPrepare: function () {
    browser.driver.manage().window().setPosition(0, 0);
    browser.driver.manage().window().setSize(1024, 1045);
    if (process.env.TEAMCITY_VERSION) {
      require('jasmine-reporters');
      jasmine.getEnv().addReporter(new jasmine.TeamcityReporter());
    }
  }
};