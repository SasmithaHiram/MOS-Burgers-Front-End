export class Customer {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;

  constructor(id: number, name: string, phoneNumber: string, email: string) {
    this.id = id;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.email = email;
  }
}
