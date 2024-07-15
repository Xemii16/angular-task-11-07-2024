import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductResponse} from "./product-response";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private client: HttpClient) {
  }

  getProducts(): Promise<ProductResponse[]> {
    return new Promise<ProductResponse[]>(resolve => {
      this.client.get<ProductResponse[]>('https://fakestoreapi.com/products').subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (error) => {
          console.error(error);
          resolve([]);
        }
      });
    });
  }
}
