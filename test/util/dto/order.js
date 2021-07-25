export default class Order {
  constructor() {
    this.id = chance.integer({ min: 0 });
    this.petId = chance.integer({ min: 0 });
    this.quantity = chance.integer({ min: 0, max: 2147483647 });
    // this.quantity = chance.integer({ max: 99 });
    this.shipDate = new Date().toISOString().replace('Z', '+0000');
    this.status = chance.pickone(['placed', 'approved', 'delivered']);
    this.complete = chance.bool();
  }
}
