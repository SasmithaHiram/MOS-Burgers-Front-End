export class Customer {
  id?: number;
  name: string;
  phoneNumber: string;
  email: string;

  constructor(name: string, phoneNumber: string, email: string) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.email = email;
  }
}
