import { CollectionViewer, DataSource } from '@angular/cdk/collections'

import { Product } from './../../models/product.model'
import { BehaviorSubject, Observable } from 'rxjs'


export class DataSourceProducts extends DataSource<Product>{

  data = new BehaviorSubject<Product[]>([]);
  dataOriginal: Product[] = []

  connect(): Observable<Product[]> {
    return this.data;
  }

  init(products: Product[]) {
    this.dataOriginal = products
    this.data.next(products);
  }

  getTotal() {
    const products = this.data.getValue();
    return products
    .map(item => item.price)
    .reduce((price, total) => price + total, 0);
  }

  update(id: Product['id'], changes: Partial<Product>) {
    const products = this.data.getValue();
    const productIndex = products.findIndex(item => item.id === id); // the first item is position 0.
    if (productIndex !== -1) { // if productIndex = 0 means false!! but first element exist so --> (productIndex !== -1) should be true because
      products[productIndex] = {
        ...products[productIndex],
        ...changes,
      }
      this.data.next(products);
    }
  }

  find(query: string) {
    // const products = this.data.getValue();
    const newProducts = this.dataOriginal.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
    this.data.next(newProducts);
  }

  disconnect() { }
}
