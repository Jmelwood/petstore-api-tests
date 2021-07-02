declare global {
  const chance: Chance.Chance;
  const baseUrl: String;
  const expect: Chai.ExpectStatic;
  const should: any;
  const nodeFetch: any;
  const attemptCount: Number;
  /**
   * A wrapper for fetching data from an endpoint, which loops a variable number of times.
   * See project README for details.
   * @param {String} endpoint - The endpoint to fetch
   * @param {Object} options
   * @param {String} options.method - The method to fetch over, defaults to "GET"
   * @param {Object} options.body - (optional) A request body to send for POST/PUT operations
   * @param {Number} options.statusCode - The response code expected, defaults to 200 success
   * @param {Number} retries - How many times to retry the fetch, defaults to 10
   * @returns {Object} Response data on success
   */
  const fetch: (endpoint: String, options: { method: String, body: Object, statusCode: Number }, retries: Number) => Object;
  const swaggerSpec: Document<{}>;
  /**
   * Finds the section of the returned API schema JSON object based on the options provided.
   * @param {String} endpoint - The endpoint path to look up
   * @param {Object} options
   * @param {String} options.method - The HTTP verb (ie. get, post, put, delete), defaults to "GET"
   * @param {String} options.statusCode - The HTTP status code (ie. 200, 400, 500), defaults to 200 success
   * @returns {Object} The section of the JSON schema that matches the provided options
   */
  const assignSchema: (endpoint, options: { method: String, statusCode: String }) => Object;
  /**
   * Simulates a "sleep" blocking call, mainly used for testing
   * @param {Number} delay - How long in ms to wait before continuing
   */
  const sleep: (delay: Number) => void;
  
  namespace NodeJS {
    interface Global {
      chance: typeof chance;
      baseUrl: string;
      expect: typeof expect;
      should: typeof should;
      nodeFetch: any;
      fetch: typeof fetch;
      swaggerSpec: typeof swaggerSpec;
      assignSchema: typeof assignSchema;
      sleep: typeof sleep;
    }
  }
}

export {};