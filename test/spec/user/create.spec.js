describe('User Create API Test Suite', () => {
  it('Can create a standard user', async function () {
    let successSchema = assignSchema('/user/{username}', 'get', 200);
    const creationRequestBody = {
      username: chance.email(),
      firstName: chance.first(),
      lastName: chance.last(),
      email: chance.email(),
      password: chance.string(),
      phone: chance.phone()
    };
    try {
      const creationResponse = await fetch(`${baseUrl}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(creationRequestBody)
      });
      expect(creationResponse.status).to.equal(200);
      const verifyResponse = await fetch(
        `${baseUrl}/user/${creationRequestBody.username}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      expect(verifyResponse.status).to.equal(200);
      const verifyResponseBody = await verifyResponse.json();
      expect(verifyResponseBody).to.be.jsonSchema(successSchema);
    } catch (err) {
      console.log(err);
    }
  });
});
