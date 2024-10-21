import { Component } from '@angular/core';
import {TripEntity} from "../../model/trip.entity";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {TripService} from "../../service/trip.service";
import {MatCard} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-trip-history',
  standalone: true,
  imports: [
    MatCard,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatButton,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef
  ],
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
