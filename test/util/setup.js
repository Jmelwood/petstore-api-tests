module.exports = (async () => {
  // Set baseUrl
  global.baseUrl = 'https://petstore.swagger.io/v2';

  // Setup Chai
  global.chai = require('chai');
  chai.use(
    require('chai-json-schema-ajv').create({
      allErrors: true
    })
  );
  global.expect = chai.expect;
  global.should = chai.should;

  // Setup Chance
  global.chance = require('chance').Chance();

  // Setup Fetch
  global.fetch = require('node-fetch');

  // Setup Swagger Schema
  const SwaggerParser = require('@apidevtools/swagger-parser');
  // Dynamically load in current Swagger spec and save it to a variable
  global.swaggerSpec = await SwaggerParser.dereference(
    `https://petstore.swagger.io/v2/swagger.json`
  );
  // Function to easily reference response schema from the spec on-demand based on endpoint, verb, and status code
  global.assignSchema = (endpoint, verb = 'get', statusCode = '200') => {
    return swaggerSpec.paths[endpoint][verb].responses[statusCode].schema;
  };
})();
