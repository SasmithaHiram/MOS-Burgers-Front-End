import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/Customer';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  addNewCustomer(customer:Customer):Observable<Customer> {
    return this.http.post<Customer>('http://localhost:8080/customer/add-customer', customer);
  }

  loadCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(
      'http://localhost:8080/customer/get-all-customers'
    );
  }
}


// this.http
//         .post<Customer>(
//           'http://localhost:8080/customer/add-customer',
//           this.customer
//         )
//         .subscribe((res) => {
//           this.customer = new Customer('', '', '');
//           this.loadCustomersTable();
//         });