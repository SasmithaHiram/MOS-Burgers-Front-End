import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  addNewProduct(product: Omit<Product, 'code'>): Observable<Product> {
    return this.http.post<Product>(
      'http://localhost:8080/product/add-product',
      product
    );
  }

  updateProduct(code: string, product: Product): Observable<Product> {
    return this.http.put<Product>(
      `http://localhost:8080/product/update-product/${code}`,
      product
    );
  }

  deleteProduct(code: string): Observable<void> {
    return this.http.delete<void>(
      `http://localhost:8080/product/delete-product/${code}`
    );
  }

  loadProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      'http://localhost:8080/product/get-all-product'
    );
  }
}
