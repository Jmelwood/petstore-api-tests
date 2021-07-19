declare global {
  const chance: Chance.Chance;
  const baseUrl: String;
  const expect: Chai.ExpectStatic;
  const should: any;
  /**
   * A wrapper for fetching data from an endpoint, which loops a variable number of times.
   * See project README for details.
   * @param {String} endpoint - The endpoint to fetch
   * @param {Object} options
   * @param {String} options.method - The method to fetch over, defaults to "GET"
   * @param {String} options.contentType - Specify content type (ie. JSON, form, etc.)
   * @param {Object} options.body - (optional) A request body to send for POST/PUT operations
   * @param {Number} options.statusCode - The response code expected, defaults to 200 success
   * @returns {Object} Response data on success
   */
  const fetch: (endpoint: String, options: { method: String, contentType: String, body: Object, statusCode: Number }) => Object;
  /**
   * A wrapper on any function that allows a customizable number of attempts before allowing it to throw an error.
   * See project README for details.
   * @param {Function} fn - The function to wrap and retry
   * @param {Array[any]} params - A list of parameters to pass into the function
   * @param {Number} retries - The amount of times to retry, defaults to 10
   */
  const fnWithRetries: (fn: Function, params: Array[any], retries: Number) => any;
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
      fetch: typeof fetch;
      fnWithRetries: typeof fnWithRetries;
      swaggerSpec: typeof swaggerSpec;
      assignSchema: typeof assignSchema;
      sleep: typeof sleep;
    }
  }
}

export {};