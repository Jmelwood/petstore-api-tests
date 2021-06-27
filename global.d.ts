declare global {
  const chance: Chance.Chance;
  const baseUrl: string;
  const expect: Chai.ExpectStatic;
  const should: any;
  const fetch: any;
  const swaggerSpec: Document<{}>;
  /**
   * Finds the section of the returned API schema JSON object based on the options provided.
   * @param {String} endpoint - The endpoint path to look up
   * @param {String} verb - The HTTP verb (ie. get, post, put, delete)
   * @param {String} statusCode - The HTTP status code (ie. 200, 400, 500)
   * @returns {Object} The section of the JSON schema that matches the provided options
   */
  const assignSchema: (endpoint: string, verb: string, statusCode: string) => Object;
  /**
   * Simulates a "sleep" blocking call
   * Some requests take a bit of extra time EVEN AFTER returning successes, to process before subsequent calls can pass
   * @param {Number} delay - How long in ms to wait before continuing
   */
  const sleep: (delay: Number) => void;
  
  namespace NodeJS {
    interface Global {
      chance: typeof chance;
      baseUrl: string;
      expect: typeof expect;
      should: typeof should;
      fetch: any;
      swaggerSpec: typeof swaggerSpec;
      assignSchema: typeof assignSchema;
      sleep: typeof sleep;
    }
  }
}

export {};