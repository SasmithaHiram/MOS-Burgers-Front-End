import { Component, Input } from '@angular/core';
import { Product } from '../../model/Product';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
handleImageError($event: ErrorEvent) {
throw new Error('Method not implemented.');
}
getSafeImageUrl(arg0: any) {
throw new Error('Method not implemented.');
}
  @Input()
  public product: any;

}
