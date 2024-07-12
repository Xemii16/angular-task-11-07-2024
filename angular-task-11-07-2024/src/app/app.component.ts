import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProductCardComponent} from "./product-card/product-card.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-task-11-07-2024';
}
