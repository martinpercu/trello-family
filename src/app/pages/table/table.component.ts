import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../../models/product.model';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent {

  products: Product[] = [];
  columns: string[] = ['id/ID', 'Name/title', 'Price', 'ImageOrCover'];
  total = 0;

  private http = inject(HttpClient);

  ngOnInit(): void {
    this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products')
    .subscribe(data => {
      this.products = data;
      this.total = this.products
        .map(item => item.price)
        .reduce((price, total) => price + total, 0);
    })
  }

}
