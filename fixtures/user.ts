export default class User {
  /**
   * The user's unique identifier number.
   */
  id: number;
  /**
   * The username of the user.
   */
  username: string;
  /**
   * The user's fist name.
   */
  firstName: string;
  /**
   * The user's last name.
   */
  lastName: string;
  /**
   * The user's email.
   */
  email: string;
  /**
   * The user's password.
   */
  password: string;
  /**
   * The user's phone number.
   */
  phone: string;
  /**
   * The user's current status in the system.
   * 1-registered,2-active,3-closed
   */
  userStatus: number;

  constructor() {
    this.id = chance.integer({ min: 10000, max: 9999999 });
    this.username = chance.string({ alpha: true });
    this.firstName = chance.first();
    this.lastName = chance.last();
    this.email = chance.email();
    this.password = chance.string({ alpha: true });
    this.phone = chance.phone({ formatted: false });
    this.userStatus = 1;
  }
}
