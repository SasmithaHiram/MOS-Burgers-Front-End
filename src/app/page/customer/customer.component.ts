import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { Customer } from '../../model/Customer';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  imports: [CommonModule, FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {
  ngOnInit(): void {
    this.loadCustomer();
  }

  constructor(private http: HttpClient) {}

  customer: Customer = new Customer('', '', '');

  addCustomer() {
    if (
      this.customer.name &&
      this.customer.phoneNumber &&
      this.customer.email
    ) {
      this.http
        .post<Customer>(
          'http://localhost:8080/customer/add-customer',
          this.customer
        )
        .subscribe((res) => {
          this.customer = new Customer('', '', '');
          console.log(res);
          this.loadCustomer();
        });
    } else {
      alert('PLEASE FILL OUT ALL REQUIRED FIELDS');
    }
  }

  customersList: Customer[] = [];

  loadCustomer() {
    this.http
      .get<Customer[]>('http://localhost:8080/customer/get-all-customers')
      .subscribe((res) => {
        this.customersList = res;
      });
  }
}
