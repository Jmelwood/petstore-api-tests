const chai = require('chai');
chai.use(
  require('chai-json-schema-ajv').create({
    allErrors: true
  })
);
global.expect = chai.expect;
global.should = chai.should;

// All asynchronous code is triggered during module export, so that promises are resolved before any test execution
module.exports = (async () => {
  const SwaggerParser = require('@apidevtools/swagger-parser');
  // Dynamically load in current Swagger specs for public/private APIs
  global.schema = await SwaggerParser.dereference(
    `https://petstore.swagger.io/v2/swagger.json`
  );
})();
