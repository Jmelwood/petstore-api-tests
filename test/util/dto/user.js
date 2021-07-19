export default class User {
  constructor() {
    this.username = chance.email();
    this.firstName = chance.first();
    this.lastName = chance.last();
    this.email = chance.email();
    this.password = chance.string();
    this.phone = chance.phone();
  }
}
