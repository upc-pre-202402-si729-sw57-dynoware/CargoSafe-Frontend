import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {ToolbarContentComponent} from "../../components/toolbar-content/toolbar-content.component";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        RouterLink,
        ToolbarContentComponent
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
