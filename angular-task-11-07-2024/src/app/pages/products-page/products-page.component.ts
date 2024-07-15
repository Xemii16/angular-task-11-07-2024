import {Component, OnInit} from '@angular/core';
import {ProductCardComponent} from "../../product-card/product-card.component";
import {ProductService} from "../../services/product.service";
import {ProductResponse} from "../../services/product-response";

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    ProductCardComponent
  ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent implements OnInit {

  products: ProductResponse[] = [];

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    this.productService.getProducts().then(products => {
      this.products = products;
    });
  }
}
