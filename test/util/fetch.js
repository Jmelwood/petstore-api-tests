/**
 * These functions constitute a custom wrapper for the "node-fetch" third-party library.
 * See the README for more information.
 */

const customFetch = async (endpoint, options) => {
  // Set default options
  if (!options) options = {};
  if (!options.method) options.method = 'GET';
  if (!options.contentType) options.contentType = 'application/json';
  if (!options.statusCode) options.statusCode = 200;
  if (debug) {
    console.log(`fetch request: ${options.method} ${endpoint}`);
    if (options.body && options.contentType.includes('json')) console.dir(JSON.parse(options.body), { depth: 3 });
  }
  return await fnWithRetries(async () => {
    return await fetchHelper(endpoint, options);
  });
};

const nodeFetch = require('node-fetch');

const fetchHelper = async (endpoint, options) => {
  let verifyResponse = await nodeFetch(endpoint, {
    method: options.method,
    body: options.body,
    headers: {
      'Content-Type': options.contentType
    }
  });
  if (debug) console.log(`Response: ${verifyResponse.status}`);
  expect(verifyResponse.status).to.equal(options.statusCode);
  let responseBody = await verifyResponse.json();
  if (debug) console.log(responseBody);
  return responseBody;
};

module.exports = customFetch;
