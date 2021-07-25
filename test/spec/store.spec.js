import Order from '../util/dto/order';

describe('/store', () => {
  it('Can create, read and delete an order', async function () {
    const order = new Order();
    // Create
    await fetch(`${baseUrl}/store/order`, {
      method: 'POST',
      body: JSON.stringify(order)
    });

    // Read - verify by ID
    let verifyResponse = await fetch(`${baseUrl}/store/order/${order.id}`);
    let successSchema = assignSchema('/store/order/{orderId}');
    expect(verifyResponse).to.be.jsonSchema(successSchema);
    expect(verifyResponse).to.include(order);

    // Delete
    await fetch(`${baseUrl}/store/order/${order.id}`, {
      method: 'DELETE'
    });
    await fetch(`${baseUrl}/store/order/${order.id}`, { statusCode: 404 });
  });
});
