import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {AddTripComponent} from "../add-trip/add-trip.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {TripService} from "../../services/trips.service";
import {
  MatCell,
  MatCellDef, MatColumnDef, MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {Trip} from "../../model/trip.entity";
import {NgClass} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-list-trip',
  standalone: true,
  imports: [
    AddTripComponent,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatSortHeader,
    MatCellDef,
    MatCell,
    MatIcon,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    NgClass,
    MatRow,
    MatPaginator,
    MatButton
  ],
  templateUrl: './list-trip.component.html',
  styleUrl: './list-trip.component.css'
})
export class ListTripComponent implements OnInit, AfterViewInit {

  //#region Attributes

  protected tripData!: Trip;
  protected columnsToDisplay: string[] = ['id', 'name', 'type', 'weight',
    'unload_location','unload_date','expense_id','alert_id','ongoing_trip_id',
  'vehicle_id','driver_id','entrepreneur_id','dimensionx',
  'dimensiony','dimensionz', 'actions'];
  @ViewChild(MatPaginator, {static: false})
  protected paginator!: MatPaginator;
  @ViewChild(MatSort)
  protected sort!: MatSort;
  protected editMode: boolean = false;
  protected dataSource!: MatTableDataSource<any>;
  private tripService: TripService = inject(TripService);

  //#endregion

  //#region Methods

  constructor() {
    this.editMode = false;
    this.tripData = new Trip({});
    this.dataSource = new MatTableDataSource();
    console.log(this.tripData);
  }

  protected onEditItem(item: Trip) {
    this.editMode = true;
    this.tripData = item;
  }

  protected onDeleteItem(item: Trip) {
    this.deleteTrip(item.id);
  }
  protected onCancelRequested() {
    this.resetEditState();
    this.getAllTrips();
  }

  protected onTripAddRequested(item: Trip) {
    this.tripData = item;
    this.createTrip();
    this.resetEditState();
  }

  protected onTripUpdateRequested(item: Trip) {
    this.tripData = item;
    this.updateTrip();
    this.resetEditState();
  }

  private resetEditState() {
    this.tripData = new Trip({});
    this.editMode = false;
  }

  private getAllTrips() {
    this.tripService.getAll().subscribe((response: Array<Trip>) => {
      this.dataSource.data = response;
      console.log(response);
    });
  }

  private createTrip() {
    this.tripService.create(this.tripData).subscribe((response: Trip) => {
      this.dataSource.data.push(response);
      this.dataSource.data = this.dataSource.data;
    });
  }

  private updateTrip() {
    let tripToUpdate = this.tripData;
    this.tripService.update(tripToUpdate.id, tripToUpdate).subscribe((response: Trip) => {
      let index = this.dataSource.data.findIndex((trip: Trip) => trip.id === response.id);
      this.dataSource.data[index] = response;
      this.dataSource.data = this.dataSource.data;
    });
  }

  private deleteTrip(id: number) {
    this.tripService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((trip: Trip) => trip.id !== id);
    });
  }

  //#endregion

  //#region Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllTrips();
  }
}
