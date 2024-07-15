import {Routes} from '@angular/router';
import {ProductsPageComponent} from "./pages/products-page/products-page.component";

export const routes: Routes = [
  {
    path: 'products',
    component: ProductsPageComponent
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: "full"
  }
];
