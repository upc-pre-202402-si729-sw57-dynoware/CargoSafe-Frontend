import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {DriverEntity} from "../../model/driver.entity";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {DriverService} from "../../services/driver.service";
import {
  DriversCreateAndEditComponent
} from "../../components/drivers-create-and-edit/drivers-create-and-edit.component";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {NgClass} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-driver-management',
  standalone: true,
  imports: [
    DriversCreateAndEditComponent,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatSortHeader,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatIcon,
    MatHeaderRow,
    NgClass,
    MatRowDef,
    MatHeaderRowDef,
    MatRow,
    MatPaginator,
    MatIconModule,
    MatIconButton,
    MatFormField,
    FormsModule,
    MatInput,
    MatButton,
    MatLabel,
    MatCardTitle,
    MatCard
  ],
  templateUrl: './driver-management.component.html',
  styleUrl: './driver-management.component.css'
})
export class DriverManagementComponent implements OnInit, AfterViewInit {
  protected driverData: DriverEntity = new DriverEntity({});
  protected columnsToDisplay: string[] = ['id', 'name', 'dni', 'phone', 'license', 'actions'];
  protected dataSource: MatTableDataSource<DriverEntity> = new MatTableDataSource();
  protected editMode: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private driverService: DriverService = inject(DriverService);

  ngOnInit(): void {
    this.getAllDrivers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSubmit(): void {
    if (this.editMode) {
      this.onDriverUpdateRequested(this.driverData);
    } else {
      const newDriver: DriverEntity = {
        id: this.dataSource.data.length + 1,
        name: this.driverData.name,
        dni: this.driverData.dni,
        phone: this.driverData.phone,
        license: this.driverData.license
      };
      this.onDriverAddRequested(newDriver);
    }
  }

  protected onEditItem(item: DriverEntity): void {
    this.editMode = true;
    this.driverData = item;
  }

  protected onDeleteItem(item: DriverEntity): void {
    this.deleteDriver(item.id);
  }

  protected onCancelRequested(): void {
    this.resetEditState();
    this.getAllDrivers();
  }

  protected onAddDriver(): void {
    this.editMode = false;
    this.driverData = new DriverEntity({});
  }

  protected onDriverAddRequested(item: DriverEntity): void {
    this.driverData = item;
    this.createDriver();
    this.resetEditState();
  }

  protected onDriverUpdateRequested(item: DriverEntity): void {
    this.driverData = item;
    this.updateDriver();
    this.resetEditState();
  }

  private resetEditState(): void {
    this.driverData = new DriverEntity({});
    this.editMode = false;
  }

  private getAllDrivers(): void {
    this.driverService.getAll().subscribe((response: DriverEntity[]) => {
      this.dataSource.data = response;
    });
  }

  private createDriver(): void {
    this.driverService.create(this.driverData).subscribe((response: DriverEntity) => {
      this.dataSource.data.push(response);
      this.dataSource.data = [...this.dataSource.data];
    });
  }

  private updateDriver(): void {
    this.driverService.update(this.driverData.id, this.driverData).subscribe((response: DriverEntity) => {
      const index = this.dataSource.data.findIndex(driver => driver.id === response.id);
      this.dataSource.data[index] = response;
      this.dataSource.data = [...this.dataSource.data];
    });
  }

  private deleteDriver(id: number): void {
    this.driverService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(driver => driver.id !== id);
    });
  }
}
