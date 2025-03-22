import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { Customer } from '../../model/Customer';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../../service/CustomerService';

@Component({
  selector: 'app-customer',
  imports: [CommonModule, FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {
  ngOnInit(): void {
    this.loadCustomersTable();
  }

  constructor(
    private http: HttpClient,
    private customerService: CustomerService
  ) {}

  customer: Customer = new Customer('', '', '');

  addCustomer() {
    if (
      this.customer.name &&
      this.customer.phoneNumber &&
      this.customer.email
    ) {
      this.customerService.addNewCustomer(this.customer).subscribe(() => {
        this.customer = new Customer('', '', '');
        this.loadCustomersTable();
      });
    } else {
      alert('PLEASE FILL OUT ALL REQUIRED FIELDS');
    }
  }

  customersList: Customer[] = [];

  loadCustomersTable() {
    this.customerService
      .loadCustomers()
      .subscribe((customersList: Customer[]) => {
        this.customersList = customersList;
      });
  }
}
