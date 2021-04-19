import User from '../../util/user';

describe('User Create API Test Suite', () => {
  it('Can create a standard user', async function () {
    let successSchema = assignSchema('/user/{username}', 'get', '200');
    let user = new User();
    const creationRequestBody = {
      username: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      phone: user.phone
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
      const verifyResponse = await fetch(`${baseUrl}/user/${creationRequestBody.username}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      expect(verifyResponse.status).to.equal(200);
      const verifyResponseBody = await verifyResponse.json();
      expect(verifyResponseBody).to.be.jsonSchema(successSchema);
    } catch (err) {
      console.log(err);
    }
  });
});
