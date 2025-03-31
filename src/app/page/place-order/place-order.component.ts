import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../common/product-card/product-card.component';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../service/ProductService';
import { Product } from '../../model/Product';
import { NgFor } from '@angular/common';
import { Customer } from '../../model/Customer';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../service/CustomerService';
import { AfterViewInit } from '@angular/core';

declare const window: any;

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
  enterAmount: any;

  ngOnInit(): void {
    this.loadProductsTable();
    this.getAllCustomer();
  }

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private customerService: CustomerService
  ) {}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

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

    if (this.enterAmount != null) {
      const order = {
        totalAmount: this.getTotalAmount(),
        receivedAmount: this.enterAmount,
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
      this.http
        .post('http://localhost:8080/order/place-order', order)
        .subscribe({
          next: (response) => {
            alert('ORDER PLACED SUCCESSFULLY');
            this.generatePDF(order);
            this.cart = [];
          },
        });
    } else {
      alert('PLEASE ENTER THE RECEIVED AMOUNT BEFORE PLACING THE ORDER');
    }
  }

  customersList: Customer[] = [];

  getAllCustomer() {
    this.customerService
      .loadCustomers()
      .subscribe((customerList: Customer[]) => {
        this.customersList = customerList;
      });
  }

  generatePDF(order: any) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text('MOS Burgers', 75, 15);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Customer Name: ${order.customerName || 'N/A'}`, 10, 30);
    doc.text(`Total Amount: Rs.${order.totalAmount.toFixed(2)}`, 10, 40);
    doc.text(`Received Amount: Rs.${order.receivedAmount.toFixed(2)}`, 10, 50);

    let yPosition = 65;
    doc.setFillColor(200, 200, 200);
    doc.rect(10, yPosition - 5, 190, 8, 'F');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('No.', 12, yPosition);
    doc.text('Product Name', 40, yPosition);
    doc.text('Qty', 120, yPosition);
    doc.text('Price', 140, yPosition);
    doc.text('Total', 160, yPosition);

    yPosition += 10;

    order.orderDetails.forEach((item: any, index: number) => {
      doc.setFontSize(10);
      doc.text(`${index + 1}`, 12, yPosition);
      doc.text(`${item.product.name}`, 40, yPosition);
      doc.text(`${item.qty}`, 120, yPosition);
      doc.text(`${item.product.price.toFixed(2)}`, 140, yPosition);
      doc.text(`${item.total.toFixed(2)}`, 160, yPosition);
      yPosition += 8;
    });

    doc.setFontSize(14);
    doc.setTextColor(255, 0, 0);
    doc.text(
      `Grand Total: Rs.${order.totalAmount.toFixed(2)}`,
      140,
      yPosition + 10
    );

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('Thank you for shopping with us!', 70, yPosition + 20);

    doc.save(`${order.customerName}.pdf`);
  }
}
