import { Args, Query, Resolver } from '@nestjs/graphql';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product], { name: 'products' })
  getProducts() {
    return this.productService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  getProduct(@Args('id') id: number) {
    return this.productService.findOne(id);
  }
}
