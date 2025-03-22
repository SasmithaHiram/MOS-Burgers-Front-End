import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { Customer } from '../../model/Customer';

@Component({
  selector: 'app-customer',
  imports: [CommonModule, FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent {
  constructor() {
    new Customer(1, 'Sasmitha', '0714839984', 'sasmithahiram@gmail.com');

    let customer1: Customer = {
      id: 1,
      name: 'Sasmitha',
      phoneNumber: '0714839984',
      email: 'sasmithahiramm@gmail.com',
    };
  }

  customerLisst: Customer[] = [
    new Customer(1, 'Sasmitha', '0714839984', 'sasmithahiram@gmail.com'),
    new Customer(1, 'Sasmitha', '0714839984', 'sasmithahiram@gmail.com'),
  ];
}
