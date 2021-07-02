module.exports = (async () => {
  global.debug = process.env.DEBUG;

  global.baseUrl = 'https://petstore.swagger.io/v2';

  const chai = require('chai');
  chai.use(
    require('chai-json-schema-ajv').create({
      allErrors: true
    })
  );
  const ajvFormats = require('ajv-formats');
  ajvFormats(chai.ajv);
  chai.ajv.addKeyword('xml');
  global.expect = chai.expect;
  global.should = chai.should();

  global.chance = require('chance').Chance();

  global.nodeFetch = require('node-fetch');
  global.fetch = async (endpoint, options = { method: 'GET', statusCode: 200 }, retries = 10) => {
    var verifyResponse;
    if (debug) {
      console.log(`fetch request: ${options.method || 'GET'} ${endpoint}`);
      if (options.body) console.dir(options.body, { depth: 3 });
    }
    for (let attempt = 1; attempt < retries; attempt++) {
      if (debug) console.log(`Attempt ${attempt}`);
      verifyResponse = await nodeFetch(endpoint, {
        method: options.method || 'GET',
        body: options.body,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      try {
        if (debug) {
          console.log(`Response: ${verifyResponse.status}`);
        }
        expect(verifyResponse.status).to.equal(options.statusCode || 200);
        return verifyResponse;
      } catch (exception) {
        continue;
      }
    }
    // If outside of the loop and it has not returned, this is the final attempt
    if (debug) console.log(`Final attempt`);
    verifyResponse = await nodeFetch(endpoint, {
      method: options.method || 'GET',
      body: options.body,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (debug) {
      console.log(`Response: ${verifyResponse.status}`);
    }
    expect(verifyResponse.status).to.equal(options.statusCode || 200);
  };

  const SwaggerParser = require('@apidevtools/swagger-parser');
  // Dynamically load in current Swagger spec and save it to a variable
  global.swaggerSpec = await SwaggerParser.dereference(`https://petstore.swagger.io/v2/swagger.json`);
  global.assignSchema = (endpoint, options = { method: 'get', statusCode: '200' }) => {
    return swaggerSpec.paths[endpoint][options.method].responses[options.statusCode].schema;
  };

  global.sleep = (delay) => {
    let start = new Date().getTime();
    while (new Date().getTime() < start + delay);
  };
})();
