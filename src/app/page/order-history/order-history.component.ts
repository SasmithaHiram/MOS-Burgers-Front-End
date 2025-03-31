import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-history',
  imports: [NgFor],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css',
})
export class OrderHistoryComponent implements OnInit {
  ngOnInit(): void {
    this.loadOrderHistory();
  }
  constructor(private http: HttpClient) {}

  orderHistory: any[] = [];

  loadOrderHistory() {
    this.http
      .get<any>('http://localhost:8080/order/get-All')
      .subscribe((res) => {
        console.log(res);
        
        this.orderHistory = res;
      });
  }
}
