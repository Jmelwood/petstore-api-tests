declare global {
  const chance: Chance.Chance;
  const baseUrl: string;
  const expect: Chai.ExpectStatic;
  const should: any;
  const fetch: any;
  const swaggerSpec: Document<{}>;
  const assignSchema: (endpoint: string, verb: string, statusCode: string) => Object;
  
  namespace NodeJS {
    interface Global {
      chance: typeof chance;
      baseUrl: string;
      expect: typeof expect;
      should: typeof should;
      fetch: any;
      swaggerSpec: typeof swaggerSpec;
      assignSchema: typeof assignSchema;
    }
  }
}

export {};