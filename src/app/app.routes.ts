import { Routes } from '@angular/router';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ProductComponent } from './page/product/product.component';
import { CustomerComponent } from './page/customer/customer.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { PlaceOrderComponent } from './page/place-order/place-order.component';
import { ChartComponent } from './page/chart/chart.component';
import { OrderHistoryComponent } from './page/order-history/order-history.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'chart', component: ChartComponent },
      { path: 'products', component: ProductComponent },
      { path: 'customers', component: CustomerComponent },
      { path: 'place-order', component: PlaceOrderComponent },
      { path: 'get-all-order-history', component: OrderHistoryComponent },
    ],
  },
];
