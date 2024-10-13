import {AfterViewInit, Component, EventEmitter, inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {
    DriversCreateAndEditComponent
} from "../../components/drivers-create-and-edit/drivers-create-and-edit.component";
import {DriverEntity} from "../../model/driver.entity";
import {FormsModule, NgForm} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DriverService} from "../../services/driver.service";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {NgIf} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {ToolbarContentComponent} from "../../../public/components/toolbar-content/toolbar-content.component";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-add-driver-management',
  standalone: true,
  imports: [
    DriversCreateAndEditComponent,
    MatFormField,
    NgIf,
    MatInput,
    MatButton,
    MatCardTitle,
    MatCard,
    MatCardContent,
    FormsModule,
    ToolbarContentComponent,
    MatLabel,
    MatError,
    MatIcon
  ],
  templateUrl: './add-driver-management.component.html',
  styleUrl: './add-driver-management.component.css'
})
export class AddDriverManagementComponent implements OnInit {
  protected driverData: DriverEntity = new DriverEntity({});
  protected editMode: boolean = false;
  protected dataSource: MatTableDataSource<DriverEntity> = new MatTableDataSource();

  private driverService: DriverService = inject(DriverService);

  ngOnInit(): void {
    this.getAllDrivers();
  }

  onSubmit(): void {
    if (this.editMode) {
      this.updateDriver();
    } else {
      this.createDriver();
    }
    this.resetEditState();
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
      this.dataSource.data = [...this.dataSource.data, response];
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
