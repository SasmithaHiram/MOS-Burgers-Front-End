import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../common/product-card/product-card.component';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../service/ProductService';
import { Product } from '../../model/Product';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-place-order',
  imports: [ProductCardComponent, NgFor],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css',
})
export class PlaceOrderComponent implements OnInit {
  cartItems: any;
  totalAmount: any;
  orderService: any;
  ngOnInit(): void {
    this.loadProductsTable();
  }

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {}

  product: Product = new Product('', '', 0, '');

  productList: Product[] = [];

  loadProductsTable() {
    this.productService.loadProducts().subscribe((productList: Product[]) => {
      this.productList = productList;
    });
  }

  cart: any[] = [];

  addToCart(product: Product) {
    this.cart.push(product);
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
  }

  getTotalAmount(): number {
    return this.cart.reduce((total, item) => total + item.price, 0);
  }

  placeOrder() {
    if (this.cart.length === 0) {
      alert('YOUR CART IS EMPTY');
      return;
    }
  }
  
}
