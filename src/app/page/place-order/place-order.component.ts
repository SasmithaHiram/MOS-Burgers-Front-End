import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../common/product-card/product-card.component';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../service/ProductService';
import { Product } from '../../model/Product';
import { NgFor } from '@angular/common';
import { Customer } from '../../model/Customer';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../service/CustomerService';

@Component({
  selector: 'app-place-order',
  imports: [ProductCardComponent, NgFor, FormsModule],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css',
})
export class PlaceOrderComponent implements OnInit {
  [x: string]: any;
  cartItems: any;
  totalAmount: any;
  orderService: any;
  selectedCustomer: any;
  selectCustomer: any;
  ngOnInit(): void {
    this.loadProductsTable();
    this.getAllCustomer();
  }

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private customerService: CustomerService
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
    const existingProduct = this.cart.find(
      (item) => item.product.code === product.code
    );

    if (existingProduct) {
      existingProduct.qty++;
    } else {
      this.cart.push({ product, qty: 1 });
    }
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
  }

  getTotalAmount(): number {
    return this.cart.reduce(
      (total, item) => total + item.product.price * item.qty,
      0
    );
  }

  placeOrder() {
    if (this.cart.length === 0) {
      alert('YOUR CART IS EMPTY');
      return;
    }

    const selectedCustomer = this.customersList.find(
      (customer) => customer.id == this.selectCustomer
    );

   

    const order = {
      totalAmount: this.getTotalAmount(),
      customerName: selectedCustomer?.name,
      orderDetails: this.cart.map((item) => ({
        product: {
          code: item.product.code,
          name: item.product.name,
          price: item.product.price,
        },
        qty: item.qty,
        total: item.product.price * item.qty,
      })),
    };
    this.http.post('http://localhost:8080/order/place-order', order).subscribe({
      next: (response) => {
        alert('ORDER PLACED SUCCESSFULLY');
        this.cart = [];
      },
    });
  }

  customersList: Customer[] = [];

  getAllCustomer() {
    this.customerService
      .loadCustomers()
      .subscribe((customerList: Customer[]) => {
        this.customersList = customerList;
      });
  }
}
