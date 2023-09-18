import type { Chance } from 'chance';

/* eslint-disable no-var */
declare global {
  var chance: Chance.Chance;
  namespace NodeJS {
    interface Global {
      chance: typeof chance;
    }
  }
}

export {};
