import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../model/Product';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../service/ProductService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  ngOnInit(): void {
    this.loadProductsTable();
  }

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {}

  product: Product = new Product('', '', 0, '');

  addProduct() {
    if (
      this.product.category &&
      this.product.name &&
      this.product.price &&
      this.product.image
    ) {
      this.productService.addNewProduct(this.product).subscribe(() => {
        this.resetForm();
        this.loadProductsTable();
      });
    } else {
      alert('PLEASE FILL OUT ALL REQUIRED FIELDS');
    }
  }

  resetForm() {
    this.product = new Product('', '', 0, '');
    this.isEditMode = false;
    this.selectedProductId = null;
  }

  isEditMode: boolean = false;
  selectedProductId: number | null = null;

  editProduct(product: Product) {
    this.isEditMode = true;
    this.selectedProductId = this.product.code as number;
    this.product = { ...product };
  }

  cancelEdit() {
    this.resetForm();
  }
  
  productList: Product[] = [];

  loadProductsTable() {
    this.productService.loadProducts().subscribe((productList: Product[]) => {
      this.productList = productList;
    });
  }

  deleteProduct(code?: number) {
    if (!code) return;

    if (confirm('ARE YOU SURE YOU WANT TO DELETE THIS CUSTOMER?')) {
      this.productService.deleteProduct(code.toString()).subscribe(() => {
        this.loadProductsTable();
      });
    }
  }

}
