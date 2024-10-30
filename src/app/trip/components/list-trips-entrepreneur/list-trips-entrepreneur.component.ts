import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {TripEntity} from "../../model/trip.entity";
import {TripService} from "../../service/trip.service";
import {ToolbarContentComponent} from "../../../public/components/toolbar-content/toolbar-content.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-list-trips-entrepreneur',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    ToolbarContentComponent
  ],
  templateUrl: './list-trips-entrepreneur.component.html',
  styleUrl: './list-trips-entrepreneur.component.css'
})
export class ListTripsEntrepreneurComponent implements OnInit {
  trips: TripEntity[] = [];

  constructor(
    private tripService: TripService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.tripService.getAll().subscribe(
      trips => this.trips = trips,
      error => this.handleError('Error loading trips', error)
    );
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.snackBar.open(message, 'Cerrar', { duration: 2000 });
  }
}
