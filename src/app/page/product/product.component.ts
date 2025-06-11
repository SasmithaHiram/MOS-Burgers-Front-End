import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../model/Product';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../service/ProductService';
import { Observable } from 'rxjs';
import { CloudinaryService } from '../../service/CloudinaryService';

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
    private productService: ProductService,
    private cloudinaryService: CloudinaryService
  ) {}

  product: Product = new Product('', '', 0, '');

  selectedFile: File | null = null;
  cloudinaryImageURL: string = '';
  isUploading: boolean = false;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadImage() {
    if (this.selectedFile) {
      this.isUploading = true;

      this.cloudinaryService.uploadImage(this.selectedFile).subscribe({
        next: (res) => {
          this.cloudinaryImageURL = res.imageURL;
          this.isUploading = false;
        },
      });
    }
  }

  addProduct() {
    if (!this.product.category || !this.product.name || !this.product.price) {
      alert('PLEASE FILL OUT ALL REQUIRED FIELDS');
      return;
    }

    this.product.image = this.cloudinaryImageURL;

    this.productService.addNewProduct(this.product).subscribe({
      next: () => {
        alert('PRODUCT ADDED SUCCESSFULLY');
        this.resetForm();
        this.loadProductsTable();
      },
      error: (err) => {
        console.error('ERROR ADDING PRODUCT', err);
        alert('ERROR ADDING PRODUCT');
      },
    });
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

    if (confirm('ARE YOU SURE YOU WANT TO DELETE THIS PRODUCT?')) {
      this.productService.deleteProduct(code.toString()).subscribe(() => {
        this.loadProductsTable();
      });
    }
  }
}
