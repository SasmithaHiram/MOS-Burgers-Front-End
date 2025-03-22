import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/Customer';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  loadCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(
      'http://localhost:8080/customer/get-all-customers'
    );
  }
}
