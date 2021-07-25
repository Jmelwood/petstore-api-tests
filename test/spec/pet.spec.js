import Pet from '../util/dto/pet';

describe('/pet', () => {
  beforeEach(async function () {
    this.currentTest.initialPet = new Pet();
    // Create
    await fetch(`${baseUrl}/pet`, {
      method: 'POST',
      body: JSON.stringify(this.currentTest.initialPet)
    });
  });

  it('Can read, update, and delete a pet', async function () {
    // Read - verify by ID
    let verifyResponse = await fetch(`${baseUrl}/pet/${this.test.initialPet.id}`);
    let successSchema = assignSchema('/pet/{petId}');
    expect(verifyResponse).to.be.jsonSchema(successSchema);
    expect(verifyResponse).to.deep.include(this.test.initialPet);

    // Update
    // NOTE: While there is a PUT method to overwrite more than just the name/status, it is naive
    // and has a chance of just creating the resource on a different database than the one where the original
    // resource was created. The POST one guarantees a 404 if the ID cannot be found and will keep trying until it succeeds.
    let newPet = new Pet();
    // Replace all fields with this.test.initialPet, except for name/status
    newPet.id = this.test.initialPet.id;
    newPet.category.id = this.test.initialPet.category.id;
    newPet.category.name = this.test.initialPet.category.name;
    await fetch(`${baseUrl}/pet/${this.test.initialPet.id}`, {
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      body: `name=${newPet.name}&status=${newPet.status}`
    });
    verifyResponse = await fetch(`${baseUrl}/pet/${newPet.id}`);
    expect(verifyResponse).to.deep.include(newPet);

    // Delete
    await fetch(`${baseUrl}/pet/${newPet.id}`, {
      method: 'DELETE'
    });
    await fetch(`${baseUrl}/pet/${newPet.id}`, { statusCode: 404 });
  });

  it('Can verify a pet by status', async function () {
    // Unfortunately, this test has to be wrapped in `fnWithRetries`, as it's possible the database queried
    // does not contain the pet created.
    await fnWithRetries(
      async function (pet) {
        let verifyResponse = await fetch(`${baseUrl}/pet/findByStatus?status=${pet.status}`);
        // Responses from others not following the schema found their way in :( therefore, it cannot be validated.
        // let successSchema = assignSchema('/pet/findByStatus');
        // expect(verifyResponse).to.be.jsonSchema(successSchema);
        expect(verifyResponse).to.deep.include(pet);
      },
      [this.test.initialPet]
    );
  });
});
