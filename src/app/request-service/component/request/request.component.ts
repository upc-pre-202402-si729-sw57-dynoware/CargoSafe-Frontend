import {Component, inject, ViewChild} from '@angular/core';
import {AddTripComponent} from "../../../trip/components/add-trip/add-trip.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {TripService} from "../../../trip/service/trip.service";
import {TripEntity} from "../../../trip/model/trip.entity";
import {
  ToolbarEntrepreneurContentComponent
} from "../../../public/components/toolbar-entrepreneur-content/toolbar-entrepreneur-content.component";

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [
    AddTripComponent,
    ToolbarEntrepreneurContentComponent
  ],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css'
})
export class RequestComponent {
  @ViewChild(MatPaginator, {static: false})
  protected paginator!: MatPaginator;
  @ViewChild(MatSort)
  protected sort!: MatSort;
  protected editMode: boolean = false;
  protected dataSource!: MatTableDataSource<any>;
  private tripService: TripService = inject(TripService);
  protected tripData!: TripEntity;
  //#endregion

  //#region Methods

  constructor() {
    this.editMode = false;
    this.tripData = new TripEntity({});
    this.dataSource = new MatTableDataSource();
    console.log(this.tripData);
  }

  protected onEditItem(item: TripEntity) {
    this.editMode = true;
    this.tripData = item;
  }

  protected onDeleteItem(item: TripEntity) {
    this.deleteTrip(item.id);
  }
  protected onCancelRequested() {
    this.resetEditState();
    this.getAllTrips();
  }

  protected onTripAddRequested(item: TripEntity) {
    this.tripData = item;
    this.createTrip();
    this.resetEditState();
  }

  protected onTripUpdateRequested(item: TripEntity) {
    this.tripData = item;
    this.updateTrip();
    this.resetEditState();
  }

  private resetEditState() {
    this.tripData = new TripEntity({});
    this.editMode = false;
  }

  private getAllTrips() {
    this.tripService.getAll().subscribe((response: Array<TripEntity>) => {
      this.dataSource.data = response;
      console.log(response);
    });
  }

  private createTrip() {
    this.tripService.create(this.tripData).subscribe((response: TripEntity) => {
      this.dataSource.data.push(response);
      this.dataSource.data = this.dataSource.data;
    });
  }

  private updateTrip() {
    let tripToUpdate = this.tripData;
    this.tripService.update(tripToUpdate.id, tripToUpdate).subscribe((response: TripEntity) => {
      let index = this.dataSource.data.findIndex((trip: TripEntity) => trip.id === response.id);
      this.dataSource.data[index] = response;
      this.dataSource.data = this.dataSource.data;
    });
  }

  private deleteTrip(id: number) {
    this.tripService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((trip: TripEntity) => trip.id !== id);
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
