import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatLabel} from "@angular/material/form-field";
import {MatList, MatListItem} from "@angular/material/list";

@Component({
  selector: 'app-trip-tracking',
  standalone: true,
  imports: [
    MatCardTitle,
    MatLabel,
    MatCardContent,
    MatCardHeader,
    MatCard,
    MatList,
    MatListItem
  ],
  templateUrl: './trip-tracking.component.html',
  styleUrl: './trip-tracking.component.css'
})
export class TripTrackingComponent {

}
