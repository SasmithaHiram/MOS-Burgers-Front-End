import { Routes } from '@angular/router';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ProductComponent } from './page/product/product.component';
import { CustomerComponent } from './page/customer/customer.component';

export const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
        { path: "products", component: ProductComponent },
        {path: "customers", component: CustomerComponent}
    ]
  }
];
