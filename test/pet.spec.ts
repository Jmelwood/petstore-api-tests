import pactum from 'pactum';

import Pet from '../fixtures/pet.js';
import schema from '../fixtures/schema.json' assert { type: 'json' };

describe('/pet', () => {
  it('Can read, update, and delete a pet', async function () {
    const testCase = pactum.e2e('Pet CRD');
    const { ...initialPet } = new Pet();

    // Create
    await testCase
      .step('Create Initial Pet')
      .spec()
      .post('/pet')
      .withJson(initialPet)
      .expectStatus(200)
      .expectJsonSchema(schema.Pet)
      .expectJson(initialPet);

    // Read - verify by ID
    await testCase
      .step('Get Initial Pet')
      .spec()
      .get(`/pet/${initialPet.id}`)
      .expectStatus(200)
      .expectJsonSchema(schema.Pet)
      .expectJson(initialPet);

    // Update
    // NOTE: While there is a PUT method to overwrite more than just the name/status, it is naive
    // and has a chance of just creating the resource on a different database than the one where the original
    // resource was created. The POST one guarantees a 404 if the ID cannot be found and will keep trying until it succeeds.
    const { ...newPet } = new Pet();
    // Replace all fields with initialPet's values, except for name/status
    newPet.id = initialPet.id;
    newPet.category = initialPet.category;
    await testCase
      .step('Update Pet')
      .spec()
      .post(`/pet/${initialPet.id}`)
      .withHeaders('Content-Type', 'application/x-www-form-urlencoded')
      .withQueryParams({
        name: newPet.name,
        status: newPet.status
      })
      .expectStatus(200)
      .expectJsonSchema(schema.Pet)
      .expectJson(newPet);

    await testCase
      .step('Get New Pet')
      .spec()
      .get(`/pet/${newPet.id}`)
      .expectStatus(200)
      .expectJsonSchema(schema.Pet)
      .expectJson(newPet);

    // Delete
    await testCase.step('Delete Pet').spec().delete(`/pet/${newPet.id}`).expectStatus(200);
    await testCase.step('Verify deleted Pet').spec().get(`/pet/${newPet.id}`).expectStatus(404);
  });

  it('Can verify a pet by status', async function () {
    const testCase = pactum.e2e('Verify pet by status');
    const { ...pet } = new Pet();
    await testCase
      .step('Create pet')
      .spec()
      .post('/pet')
      .withJson(pet)
      .expectStatus(200)
      .expectJsonSchema(schema.Pet)
      .expectJson(pet);

    // Unfortunately, this API call has to be set to retry, as it's possible
    // the chosen database instance queried does not contain the pet created.
    await testCase
      .step('Get pet by status')
      .spec()
      .get(`/pet/findByStatus?status=${pet.status}`)
      .retry({
        count: 10,
        strategy: ({ res }) => {
          return res.statusCode === 200;
        }
      })
      .expectStatus(200)
      // .expectJsonSchema(schema.Pet) // Because the POST API does not strictly enforce the schema for anyone using this service, it cannot be validated.
      .expectJsonLike([pet]);
  });
});
