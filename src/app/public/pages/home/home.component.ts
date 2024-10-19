import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {ToolbarContentComponent} from "../../components/toolbar-content/toolbar-content.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    ToolbarContentComponent,
    TranslateModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
