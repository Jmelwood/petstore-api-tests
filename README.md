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

## Notes

### Why do some requests go through `fetchWithAttempts`?

It seems like there are two copies of the database hosted for the Petstore service, but no data replication is taking place. This means that there's a 50% chance of getting back accurate response data for subsequent API requests that depend on a prior action. The only way I can counteract this as an external party is to give subsequent requests permission to try a few times before reporting a failure. Therefore, I've wrapped `node-fetch` in a custom function that implements a `for` loop, and assigned that as the global `fetch` function. It'll either return if successful, or else it'll stop catching the failure once a configurable retry count is reached. I've chosen to set the default value to 10 attempts, which gives a < .1% chance of a false failure.

As some additional (unrelated) benefits, this wrapper function allows me to specify the `application/json` type header by default, verify that the response code is as expected, and add in debug logging for requests if enabled, all within the same function.
