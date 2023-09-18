import pactum from 'pactum';

import Order from '../fixtures/order.js';
import schema from '../fixtures/schema.json' assert { type: 'json' };

describe('/store', () => {
  it('Can create, read and delete an order', async function () {
    const testCase = pactum.e2e('Order CRD');
    const { ...order } = new Order();

    // Create
    await testCase
      .step('Create Order')
      .spec()
      .post('/store/order')
      .withJson(order)
      .expectStatus(200)
      .expectJsonSchema(schema.Order)
      .expectJson(order);

    // Read - verify by ID
    await testCase
      .step('Read Order')
      .spec()
      .get(`/store/order/${order.id}`)
      .expectStatus(200)
      .expectJsonSchema(schema.Order)
      .expectJson(order);

    // Delete
    await testCase.step('Delete Order').spec().delete(`/store/order/${order.id}`).expectStatus(200);
    await testCase.step('Check deleted order').spec().get(`/store/order/${order.id}`).expectStatus(404);
  });
});
