export default class Pet {
  constructor() {
    this.id = chance.integer({ min: 0 });
    this.category = {};
    this.category.id = chance.integer({ min: 0 });
    this.category.name = chance.word();
    this.name = chance.first();
    this.status = chance.pickone(['available', 'pending', 'sold']);
    this.photoUrls = [];
    this.tags = [];
  }
}
