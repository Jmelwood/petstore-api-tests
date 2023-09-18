export default class Pet {
  /**
   * The unique identifier for this pet entity.
   */
  id: number;
  /**
   * An object containing the identifier and name of the associated category this pet belongs to.
   */
  category: object;
  /**
   * The name of the pet.
   */
  name: string;
  /**
   * The status of the pet, based on the existance/status of an associated order entity.
   */
  status: string;
  /**
   * A list of URLs that are photos of the pet.
   */
  photoUrls: string[];
  /**
   * A list of words that relate to the pet
   */
  tags: string[];

  constructor() {
    this.id = chance.integer({ min: 0 });
    this.category = {
      id: chance.integer({ min: 0 }),
      name: chance.word()
    };
    this.name = chance.first();
    this.status = chance.pickone(['available', 'pending', 'sold']);
    this.photoUrls = [];
    this.tags = [];
  }
}
