import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  constructor() {
    for (let i = 1; i <= 10; i++) {
      this.products.push({
        id: i,
        sku: `sku-${i}`,
        name: `name-${i}`,
        desc: `desc-${i}`,
        price: i * 1_000,
      });
    }
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((p) => p.id === id);
  }
}
