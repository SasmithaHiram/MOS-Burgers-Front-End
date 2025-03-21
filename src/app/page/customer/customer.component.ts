import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-customer',
  imports: [CommonModule, FormsModule, HttpClientModule, NgFor],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {
  ngOnInit(): void {
    this.getAllCustomers();
  }
 newCustomer: any = {
    cName: '',
    cPhoneNumber: '',
    cEmail: '',
  };

  constructor(private http: HttpClient) {}

  addCustomer() {
    console.log(this.newCustomer);
    
    if (
      this.newCustomer.cName &&
      this.newCustomer.cPhoneNumber &&
      this.newCustomer.cEmail
    ) {
      this.http
        .post('http://localhost:8080/customer/add-customer', this.newCustomer)
        .subscribe((response: any) => {
          this.newCustomer = { cName: '', cPhoneNumber: '', cEmail: '' };
          this.getAllCustomers();
        });
    } else {
      (error: any) => {
        console.error('FAILED To ADD CUSTOMER :', error);
      };
    }

  }

  // searchCustomer() {
  //   this.http.get(`http://localhost:8080/customer/search-customerById/${this.newCustomer.cName}`)

  // }

  // updateCustomer() {
  //   this.http
  //     .put('http://localhost:8080/customer/update-customer', this.newCustomer)
  //     .subscribe((response: any) => {
  //       this.getAllCustomers();
  //     });
  // }
  public listOfCustomer: any = [];

  getAllCustomers() {
    this.http.get('http://localhost:8080/customer/get-all-customers').subscribe(
      (Response: any) => {
        this.listOfCustomer = Response;
        console.log(this.listOfCustomer);
      },
      (error) => {
        console.error('FAILED GET ALL CUSTOMERS');
      }
    );
  }
}
