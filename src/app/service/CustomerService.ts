import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/Customer';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  addNewCustomer(customer: Omit<Customer, 'id'>): Observable<Customer> {
    return this.http.post<Customer>(
      'http://localhost:8080/customer/add-customer',
      customer
    );
  }

  updateCustomer(id: string, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`http://localhost:8080/customer/update-customer/${id}`, customer);
  }

  deleteCustomer(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/customer/delete-customer/${id}`);
  }

  loadCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(
      'http://localhost:8080/customer/get-all-customers'
    );
  }
}
