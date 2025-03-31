import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/CustomerService';
import { ProductService } from '../../service/ProductService';
import { Customer } from '../../model/Customer';
import ApexCharts from 'apexcharts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chart',
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent implements OnInit {
  ngOnInit(): void {
    this.fetchDataAndRenderChart();
  }
  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private http: HttpClient
  ) {}

  fetchDataAndRenderChart(): void {
    this.customerService.loadCustomers().subscribe((customer: any) => {
      this.productService.loadProducts().subscribe((product: any) => {
        this.http
          .get('http://localhost:8080/order/get-All')
          .subscribe((orders: any) => {
            const customersCount = customer.length;
            const productCount = product.length;
            const orderCount = orders.length;

            this.renderChart(customersCount, productCount, orderCount);
          });
      });
    });
  }

  renderChart(
    customersCount: number,
    productCount: number,
    orderCount: number
  ): void {
    const chartOption = this.getChartOptions(
      customersCount,
      productCount,
      orderCount
    );
    chartOption.series = [customersCount, productCount, orderCount];

    const chart = new ApexCharts(
      document.querySelector('#pie-chart'),
      chartOption
    );
    chart.render();
  }
  getChartOptions(
    customersCount: number,
    productCount: number,
    orderCount: number
  ): any {
    return {
      series: [52.8, 26.8, 20.4],
      colors: ['#1C64F2', '#16BDCA', '#9061F9'],
      chart: {
        height: 420,
        width: '100%',
        type: 'pie',
      },
      stroke: {
        colors: ['white'],
        lineCap: '',
      },
      plotOptions: {
        pie: {
          labels: {
            show: true,
          },
          size: '100%',
          dataLabels: {
            offset: -25,
          },
        },
      },
      labels: ['Customers', 'Products', 'Orders'],
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: 'Inter, sans-serif',
        },
      },
      legend: {
        position: 'bottom',
        fontFamily: 'Inter, sans-serif',
      },
      yaxis: {
        labels: {
          formatter: function (value: number) {
            return value + '%';
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value: number) {
            return value + '%';
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
    };
  }
}
