export default class Order {
  /**
   * The unique identifier for this order entity.
   */
  id: number;
  /**
   * The unique identifier for the associated pet entity.
   */
  petId: number;
  /**
   * The number of the associated pet entity being ordered
   */
  quantity: number;
  /**
   * The date of shipment.
   */
  shipDate: string;
  /**
   * The current status of the order.
   */
  status: string;
  /**
   * Whether or not the order is considered finished.
   */
  complete: boolean;

  constructor() {
    this.id = chance.integer({ min: 0 });
    this.petId = chance.integer({ min: 0 });
    this.quantity = chance.integer({ min: 0, max: 2147483647 });
    // this.quantity = chance.integer({ max: 99 });
    this.shipDate = new Date().toISOString().replace('Z', '+00:00');
    this.status = chance.pickone(['placed', 'approved', 'delivered']);
    this.complete = chance.bool();
  }
}
