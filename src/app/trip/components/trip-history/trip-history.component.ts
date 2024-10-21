import { Component } from '@angular/core';
import {TripEntity} from "../../model/trip.entity";
import {MatTableDataSource} from "@angular/material/table";
import {TripService} from "../../service/trip.service";

@Component({
  selector: 'app-trip-history',
  standalone: true,
  imports: [],
  templateUrl: './trip-history.component.html',
  styleUrl: './trip-history.component.css'
})
export class TripHistoryComponent {

  title:string = 'View order history';
  trips: TripEntity[] = [];
  displayedColumns: string[] = ['order', 'status'];
  dataSource: MatTableDataSource<TripEntity>=new MatTableDataSource<TripEntity>(this.trips);
  observation: string ='';
  constructor(private tripApiService: TripService) {
    this.tripApiService.getTrips().subscribe((data: any) => {
      this.trips = data;
      console.log(data);
      this.dataSource = new MatTableDataSource<TripEntity>(this.trips);
    });
  }
}
