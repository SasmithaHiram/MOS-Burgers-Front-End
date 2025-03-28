export class Customer {
  id?: number;
  name: string;
  phoneNumber: string;
  email: string;

  constructor(name: string, phoneNumber: string, email: string, id?: number) {
    this.id = id;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.email = email;
  }
}
