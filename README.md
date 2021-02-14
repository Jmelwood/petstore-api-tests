# petstore-api-tests

Automated end-to-end API tests for the Petstore service.

## How to run

This uses the basic `fetch` web API to perform REST API end-to-end testing, paired with the Mocha test framework and Chai for easy BDD assertions.

### Prerequisites

- Node.js: I used (and only tested on) v15.8.0, with npm v7.5.0.

### Test instructions

1. Clone this repository (`git clone https://github.com/Jmcosel/petstore-api-tests.git`)
2. Navigate to the root of the folder and install the npm dependencies (`npm install`)
3. Run the tests with the following command: `npm test test/**/*.js`
