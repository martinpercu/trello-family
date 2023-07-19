import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Product {
  id: string;
  title: string;
  images: string[];
  price: number;
}


@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html'
})
export class ScrollComponent {

  products: Product[] = []

  private http = inject(HttpClient);

  ngOnInit(): void {
    this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products')
    .subscribe(data => {
      this.products = data;
    })
  }


  // https://api.escuelajs.co/api/v1/products


}
