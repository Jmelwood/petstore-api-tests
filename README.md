# Petstore API Tests

## Summary

Automated end-to-end API tests for the [Petstore](https://petstore.swagger.io) service. This is a simple framework that uses the [node-fetch](https://github.com/node-fetch/node-fetch) package to perform AJAX HTTP requests, paired with the [Mocha](https://mochajs.org) test framework and [Chai](https://www.chaijs.com/) for easy BDD assertions. Additionally, [AJV](https://github.com/ajv-validator/ajv) is implemented for JSON schema validation of all API responses.

## Prerequisites

- Node.js (last tested with version LTS 14.17.0)

## How to run tests

1. Clone this repository (`git clone https://github.com/Jmcosel/petstore-api-tests.git`)
2. Navigate to the root of the folder and install the dependencies (`cd petstore-api-tests && npm i`)
3. Run the tests with the following node command: `npx mocha test/**/*.js`
4. If you wish for a debugging experience, add `DEBUG=true` as an environment variable to the above command
