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
  chai.ajv.addKeyword('example');
  global.expect = chai.expect;
  global.should = chai.should();

  global.chance = require('chance').Chance();

  global.fetch = require('./fetch.js');

  global.fnWithRetries = require('./retries.js');

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
