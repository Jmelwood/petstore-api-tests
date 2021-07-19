import User from '../util/dto/user';

describe('/user', () => {
  it('Can create, read, update, and delete a single user', async function () {
    const initialUser = new User();
    // Create
    await fetch(`${baseUrl}/user`, {
      method: 'POST',
      body: JSON.stringify(initialUser)
    });

    // Read
    let verifyResponse = await fetch(`${baseUrl}/user/${initialUser.username}`);
    const successSchema = assignSchema('/user/{username}');
    expect(verifyResponse).to.be.jsonSchema(successSchema);
    expect(verifyResponse).to.include(initialUser);

    // Update
    const newUser = new User();
    await fetch(`${baseUrl}/user/${initialUser.username}`, {
      method: 'PUT',
      body: JSON.stringify(newUser)
    });
    verifyResponse = await fetch(`${baseUrl}/user/${newUser.username}`);
    expect(verifyResponse).to.include(newUser);

    // Delete
    await fetch(`${baseUrl}/user/${newUser.username}`, {
      method: 'DELETE'
    });
    await fetch(`${baseUrl}/user/${newUser.username}`, { statusCode: 404 });
  });

  // Loop over a variety of invalid cases to test adding unknown keys or using incorrect type values
  const problemUser = new User();
  let invalidCreationCases = [
    {
      problem: 'Incorrect/missing key names',
      requestBody: {
        a: problemUser.email,
        d: problemUser.firstName,
        f: problemUser.phone
      }
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
      }
    }
  ];

  invalidCreationCases.forEach(({ problem, requestBody }) => {
    it(`Creating a user with problem type "${problem}" causes an appropriate response error`, async function () {
      await fetch(`${baseUrl}/user`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        statusCode: 500
      });
    });
  });

  it('Can create multiple users at once', async function () {
    let accounts = [];
    for (let i = 0; i < 3; i++) {
      accounts[i] = new User();
    }
    await fetch(`${baseUrl}/user/createWithArray`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(accounts)
    });

    const successSchema = assignSchema('/user/{username}');
    for (let i = 0; i < accounts.length; i++) {
      let verifyResponse = await fetch(`${baseUrl}/user/${accounts[i].username}`);
      expect(verifyResponse).to.be.jsonSchema(successSchema);
      expect(verifyResponse).to.include(accounts[i]);
    }
  });
});
