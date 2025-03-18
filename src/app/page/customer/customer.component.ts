import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})

export class CustomerComponent {
  newCustomer: any={
    cName: '',
    cPhoneNumber: '',
    cEmail: ''
  }

  customers: any[] = [];
  
  constructor(private http: HttpClient) {}

  addCustomer() {
    console.log(this.newCustomer);
    
      this.http.post('http://localhost:8080/customer/add-customer', this.newCustomer).subscribe(
        (Response: any) => {
          this.newCustomer = {cName: '',  cPhoneNumber: '', cEmail: ''}; 
          this.getAllCustomers();
        },
        (error) => {
          console.error('FAILED To ADD CUSTOMER :', error);
        }
      );      
  }

  getAllCustomers() {
    this.http.get('http://localhost:8080/customer/get-all-customers').subscribe(
      (Response: any) => {
        this.customers=Response;
        console.log(Response);
      },
      (error) => {
        console.error('FAILED GET ALL CUSTOMERS');
      }
    )
  }


}
