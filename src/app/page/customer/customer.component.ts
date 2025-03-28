import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { Customer } from '../../model/Customer';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../../service/CustomerService';
import { Observable } from 'rxjs';

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
        this.resetForm();
        this.loadCustomersTable();
      });
    } else {
      alert('PLEASE FILL OUT ALL REQUIRED FIELDS');
    }
  }

  private resetForm() {
    this.customer = new Customer('', '', '');
    this.isEditMode = false;
    this.selectedCustomerId = null;
  }

  isEditMode: boolean = false;
  selectedCustomerId: number | null = null;

  editCustomer(customer: Customer) {
    this.isEditMode = true;
    this.selectedCustomerId = customer.id as number;
    this.customer = { ...customer };
  }

  cancelEdit() {
    this.resetForm();
  }

  deleteCustomer(id?: number) {
    if (!id) return;

    if (confirm('ARE YOU SURE YOU WANT TO DELETE THIS CUSTOMER?')) {
      this.customerService.deleteCustomer(id.toString()).subscribe(() => {
        this.loadCustomersTable();
      });
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
