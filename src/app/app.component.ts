import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MerchandiseItemComponent} from "./merchandise/components/merchandise-item/merchandise-item.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MerchandiseItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cargosafe-frontend';
}
