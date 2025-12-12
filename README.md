# Petstore API Tests

## Summary

Automated end-to-end API tests for the [Petstore](https://petstore3.swagger.io/) service, which uses the OpenAPI 3 schema specification. This is a simple framework that uses [pactum](https://pactumjs.github.io/) to perform all the HTTP requests and assertions,
paired with the [Mocha](https://mochajs.org) test framework to handle the test runner. The source code is written in TypeScript with native ESM support.

## Prerequisites

- Node.js (last tested with version LTS 24.11.1)

## How to run tests

1. Clone this repository (`git clone https://github.com/Jmelwood/petstore-api-tests.git`)
2. Navigate to the root of the folder and install the dependencies (`cd petstore-api-tests && yarn`)
3. Copy the `sample.env` and rename it to `.env` (this has the base URL of the hosted Petstore service set for pactum)
4. Run the tests with the following command: `yarn test`
5. If you wish for a debugging experience, add `DEBUG=true` as an environment variable to the above command

## Quirks

### Why is "Creating users with various problem types causes response error codes" skipped? Also, why am I getting a 500 error?

There's a bug with the Petstore code that seems to completely destroy the service's ability to create/lookup users, if you try sending it just one request that is missing a username.
It will just keep returning 500 errors until the server is restarted. Unfortunately, this means that the tests relating to `User` may give a 500 when run against the hosted service at
`https://petstore3.swagger.io/`; however, I downloaded/ran the source code for Petstore locally and verified the happy path cases do work as expected.

### Why do the `Pet` and `User` objects define an ID?

The Petstore service is naive and is not able to look up and assign a unique ID to a newly created entity. Instead, it relies on the request to specify one, which is not great design because
it can certainly be overwritten by a subsequent request. However, for this test framework's purposes where data retention doesn't matter and the likelihood of conflict is near zero, it is overlooked.

### How come you don't have full test coverage?

The endpoints are very barebones (usually just takes the data you give it without any further checks), and sometimes don't fully conform to the logic you'd expect. Instead of making assertions in the
test that will end up failing, I'd rather just list what I "would" test here, should the functionality described in the API documentation work as expected.

Those tests would include:

- Ensuring that orders don't get created if the supplied pet ID doesn't exist in the database
- User login/logout and authentication token usage (endpoints just seem to exist but do nothing, and all endpoints require no auth)
- Testing the updated count of `/store/inventory` (since data replication doesn't occur, it's impossible to know if I'm getting the right copy of the inventory or not)
- More error handling / boundary breaking (some non-200 response codes are documented, but a 50X usually comes up instead of an expected 40X)

Finally, my motivation for this project was to showcase making an E2E API framework, not to actually verify functionality of this service, which I think the limited tests that
are written have accomplished.
