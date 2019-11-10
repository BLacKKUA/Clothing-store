import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  arrProducts = [
    {
      id: 1,
      category: 't-shirt',
      name: 'T-shirt with bikes',
      description: 'some text 1',
      price: 199
    },
    {
      id: 2,
      category: 'hudi',
      name: 'Hudi with bikes',
      description: 'some text 1',
      price: 499
    }
  ];
  constructor() { }

  getProducts(): any {
    return this.arrProducts;
  }

  addProducts(obj): void {
    this.arrProducts.push(obj);
  }
}
