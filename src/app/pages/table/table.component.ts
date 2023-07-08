import { Component, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Product } from '../../models/product.model';
import { DataSourceProducts } from './data-source';
import { debounce, debounceTime } from 'rxjs';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent {

  products: Product[] = [];
  dataSource = new DataSourceProducts();
  columns: string[] = ['id/ID', 'Name/title', 'Price', 'ImageOrCover', 'actions'];
  total = 0;
  input = new FormControl('', { nonNullable: true});

  private http = inject(HttpClient);

  ngOnInit(): void {
    this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products')
    .subscribe(data => {
      // this.products = data;
      this.dataSource.init(data);
      // this.total = this.products
      //   .map(item => item.price)
      //   .reduce((price, total) => price + total, 0);
      this.total = this.dataSource.getTotal();
    })

    this.input.valueChanges
    .pipe(
      debounceTime(340)
    )
    .subscribe(value => {
      console.log(value);
      this.dataSource.find(value)
    })
  }

  update(product: Product) {
    if (product.price > 120) {
      let newPrice = product.price - 120;
      this.dataSource.update(product.id, { price: newPrice })
    }
    else {
      let newPrice = 620;;
      this.dataSource.update(product.id, { price: newPrice })
    }
  }

}
