import User from '../util/user';

describe('/user', () => {
  beforeEach('Create a new single user for each test', async function () {
    this.currentTest.user = new User();
    this.currentTest.creationRequestBody = {
      username: this.currentTest.user.email,
      firstName: this.currentTest.user.firstName,
      lastName: this.currentTest.user.lastName,
      email: this.currentTest.user.email,
      password: this.currentTest.user.password,
      phone: this.currentTest.user.phone
    };
    // Verify the creation was successful
    const creationResponse = await fetch(`${baseUrl}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.currentTest.creationRequestBody)
    });
    expect(creationResponse.status).to.equal(200);
  });

  it('Verify single user creation', async function () {
    let successSchema = assignSchema('/user/{username}', 'get', '200');
    const verifyResponse = await fetch(`${baseUrl}/user/${this.test.creationRequestBody.username}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    expect(verifyResponse.status).to.equal(200);
    const verifyResponseBody = await verifyResponse.json();
    expect(verifyResponseBody).to.be.jsonSchema(successSchema);
  });

  it('Creating a user with invalid keys or type values causes appropriate response errors');

  it('Can create multiple users at once');

  it('Can edit a user');

  it('Can delete a user');

  it('Can login/logout');
});
