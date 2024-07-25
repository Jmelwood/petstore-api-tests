import chance from 'chance';
import pactum from 'pactum';
import 'dotenv/config'

const { settings: pactumSettings } = pactum;

const debug = process.env.DEBUG;

export const mochaHooks = {
  beforeAll: function () {
    global.chance = chance.Chance();
    pactumSettings.setLogLevel(debug ? 'DEBUG' : 'WARN');
  }
};
