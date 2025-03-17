import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer',
  imports: [FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent {
  customer: any = {
    name: '',
    phoneNumber: '',
    email: '',
  };

  addCustomer() {
    // if (
    //   !this.customer.name ||
    //   !this.customer.phoneNumber ||
    //   !this.customer.email
    // ) {
    //   alert('ALL FIELDS ARE REQUIRED!');
    // } else {
    //   return;
    // }

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      name: this.customer.name,
      email: this.customer.phoneNumber,
      phoneNumber: this.customer.email,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:8080/customer/add-customer', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }
}
