import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {VehicleEntity} from "../../model/vehicle.entity";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {VehicleService} from "../../service/vehicle.service";

@Component({
  selector: 'app-vehicle-management',
  standalone: true,
  imports: [],
  templateUrl: './vehicle-management.component.html',
  styleUrl: './vehicle-management.component.css'
})
export class VehiclesManagementComponent implements OnInit, AfterViewInit {

  //#region Attributes

protected vehicleData!: VehicleEntity;
protected columnsToDisplay: string[] = ['id', 'model', 'plate', 'max_load', 'volume', 'photo', 'actions']; // Añadida columna 'actions'
@ViewChild(MatPaginator, { static: false })
protected paginator!: MatPaginator;
@ViewChild(MatSort)
protected sort!: MatSort;
protected editMode: boolean = false;
protected dataSource!: MatTableDataSource<any>;
private vehicleService: VehicleService = inject(VehicleService);

  //#endregion

  //#region Methods

  constructor() {
    this.editMode = false;
    this.vehicleData = new VehicleEntity({});
    this.dataSource = new MatTableDataSource();
  }

  onSubmit(): void {
    if (this.editMode) {

    this.onVehicleUpdateRequested(this.vehicleData!);
  } else {

    const newVehicle: VehicleEntity = {
      id: this.dataSource.data.length + 1,
      model: this.vehicleData?.model || '',
      plate: this.vehicleData?.plate || '',
      max_load: this.vehicleData?.max_load || '',
      volume: this.vehicleData?.volume || '',
      url_image: this.vehicleData?.url_image || '',
    };
    this.onVehicleAddRequested(newVehicle);
  }
}

protected onEditItem(item: VehicleEntity) {
    this.editMode = true;
    this.vehicleData = item;
  }

protected onDeleteItem(item: VehicleEntity) {
    this.deleteVehicle(item.id);
  }

protected onCancelRequested() {
    this.resetEditState();
    this.getAllVehicles();
  }

protected onVehicleAddRequested(item: VehicleEntity) {
    this.createVehicle(item);
    this.resetEditState();
  }

protected onVehicleUpdateRequested(item: VehicleEntity) {
    this.updateVehicle(item);
    this.resetEditState();
  }

private resetEditState() {
    this.vehicleData = new VehicleEntity({});
    this.editMode = false;
  }

private getAllVehicles() {
    this.vehicleService.getAll().subscribe((response: Array<VehicleEntity>) => {
      this.dataSource.data = response;
    });
  }

private createVehicle(vehicle: VehicleEntity) {
    this.vehicleService.create(vehicle).subscribe((response: VehicleEntity) => {
      this.dataSource.data.push(response);
      this.dataSource._updateChangeSubscription();
    });
  }

private updateVehicle(vehicle: VehicleEntity) {
    this.vehicleService.update(vehicle.id, vehicle).subscribe((response: VehicleEntity) => {
      const index = this.dataSource.data.findIndex(v => v.id === response.id);
      if (index !== -1) {
        this.dataSource.data[index] = response;
        this.dataSource._updateChangeSubscription();
      }
    });
  }

private deleteVehicle(id: number) {
    this.vehicleService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(vehicle => vehicle.id !== id);
      this.dataSource._updateChangeSubscription();
    });
  }

  //#endregion

  //#region Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllVehicles();
  }

  //#endregion
}
