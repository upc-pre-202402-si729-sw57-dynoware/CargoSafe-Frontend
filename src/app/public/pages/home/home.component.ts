import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {ToolbarContentComponent} from "../../components/toolbar-content/toolbar-content.component";
import {
  ToolbarEntrepreneurContentComponent
} from "../../components/toolbar-entrepreneur-content/toolbar-entrepreneur-content.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    ToolbarContentComponent,
    ToolbarEntrepreneurContentComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

/**
 * Home component
 * This class is in charge of managing the home component
 * @class
 */

export class HomeComponent {
  trips: any[] = [];
  openAssignDialog(trip: any) {

  }
}
