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

## Quirks

### What is the purpose of `fnWithRetries`?

It seems like there are two copies of the database hosted for the Petstore service, but no data replication is taking place. This means that there's a 50% chance of getting back accurate response data for subsequent API requests that depend on a prior action. The only way I can counteract this as an external party is to give subsequent requests permission to try a few times before reporting a failure. Therefore, I've wrapped `node-fetch` in a custom `fetchHelper` function. Then, the `fetchHelper` function is passed as a parameter to a "retry" function called `fnWithRetries`, which takes the provided parameter function and puts it in a `for` loop for a provided amount of retries. It'll either return if successful, or else it'll stop catching the failure once a configurable retry count is reached. I've chosen to set the default retries value to 10 attempts, which gives a < .1% chance of a false failure.

### Why is `fetch` a custom function?

In addition to needing to send fetch requests several times to deal with the lack of data replication, I've wrapped `node-fetch` into `fetchHelper`, and `fetchHelper` into a custom global `fetch` function that gives some additional benefits, including:

- Specifying default values for the request, like method and content type
- Specifying an expected response code, necessary for ensuring the retry function knows when it's got a good response
- Adding in debug logging for requests (if enabled)
- Translates the response body into a readable JSON

### Why does the `Pet` object define an ID?

The Petstore service is naive and is not able to look up and assign a unique ID to a newly created `Pet` object. Instead, it relies on the request to specify one, which is not great design because it can certainly be overwritten by a subsequent request. However, for this test framework's purposes where data retention doesn't matter and the likelihood of conflict is near zero, it is overlooked.
