module.exports = (async () => {
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

  global.fetch = require('node-fetch');

  const SwaggerParser = require('@apidevtools/swagger-parser');
  // Dynamically load in current Swagger spec and save it to a variable
  global.swaggerSpec = await SwaggerParser.dereference(`https://petstore.swagger.io/v2/swagger.json`);
  global.assignSchema = (endpoint, verb = 'get', statusCode = '200') => {
    return swaggerSpec.paths[endpoint][verb].responses[statusCode].schema;
  };

  global.sleep = (delay) => {
    let start = new Date().getTime();
    while (new Date().getTime() < start + delay);
  };
})();
