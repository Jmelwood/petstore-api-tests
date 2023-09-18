import pactum from 'pactum';

import User from '../fixtures/user.js';
import schema from '../fixtures/schema.json' assert { type: 'json' };

describe('/user', () => {
  it('Can create, read, update, and delete a single user', async function () {
    const testCase = pactum.e2e('User CRD');
    const { ...initialUser } = new User();

    // Create
    await testCase
      .step('Create Initial User')
      .spec()
      .post('/user')
      .withJson(initialUser)
      .expectStatus(200)
      .expectJsonSchema(schema.User)
      .expectJson(initialUser);

    // Read
    await testCase
      .step('Get Initial User')
      .spec()
      .get(`/user/${initialUser.username}`)
      .expectStatus(200)
      .expectJsonSchema(schema.User)
      .expectJson(initialUser);

    // Update
    const { ...newUser } = new User();
    await testCase
      .step('Update User')
      .spec()
      .put(`/user/${initialUser.username}`)
      .withJson(newUser)
      .expectStatus(200)
      .expectJsonSchema(schema.User)
      .expectJson(newUser);

    // Delete
    await testCase.step('Delete User').spec().delete(`/user/${newUser.username}`).expectStatus(200);
    await testCase.step('Verify deleted User').spec().get(`/user/${newUser.username}`).expectStatus(404);
  });

  it.skip(`Creating users with various problem types causes response error codes`, async function () {
    // Loop over a variety of invalid cases to test adding unknown keys or using incorrect type values
    const { ...problemUser } = new User();
    const invalidCreationCases = [
      {
        problem: 'Incorrect/missing key names',
        requestBody: {
          a: problemUser.email,
          d: problemUser.firstName,
          f: problemUser.phone
        },
        // This is obviously wrong but out of my control, and I felt like demonstrating this use case nonetheless.
        statusCode: 200
      },
      {
        problem: 'Incorrect datatype for values',
        requestBody: {
          username: true,
          firstName: false,
          lastName: false,
          email: 1,
          password: ['blah'],
          phone: 40.5
        },
        statusCode: 400
      }
    ];

    for (const user of invalidCreationCases) {
      await pactum.spec().post('/user').withJson(user.requestBody).expectStatus(user.statusCode);
    }
  });

  it('Can create multiple users at once', async function () {
    const accounts: User[] = [];
    for (let i = 0; i < 3; i++) {
      const { ...user } = new User();
      accounts[i] = user;
    }
    const testCase = pactum.e2e('Create multiple Users');
    await testCase
      .step('Create Users')
      .spec()
      .post('/user/createWithList')
      .withHeaders('Content-Type', 'application/json')
      .withJson(accounts);

    for (const count in accounts) {
      await testCase
        .step(`Verify Account #${count}`)
        .spec()
        .get(`/user/${accounts[count].username}`)
        .expectStatus(200)
        .expectJsonSchema(schema.User)
        .expectJson(accounts[count]);
    }
  });
});
