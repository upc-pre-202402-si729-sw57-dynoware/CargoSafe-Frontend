import { Component,inject, OnInit} from '@angular/core';
import {
    DriversEditComponent
} from "../../components/drivers-edit/drivers-edit.component";
import {DriverEntity} from "../../model/driver.entity";
import {FormsModule} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {DriverService} from "../../services/driver.service";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {NgIf} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {ToolbarContentComponent} from "../../../public/components/toolbar-content/toolbar-content.component";
import {MatIcon} from "@angular/material/icon";
import {
  DialogSuccessfullyComponent
} from "../../../public/components/dialogs/dialog-successfully/dialog-successfully.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-driver-management',
  standalone: true,
  imports: [
    DriversEditComponent,
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
  private dialog: MatDialog = inject(MatDialog);
  private router: Router = inject(Router);

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
      this.showSuccessDialog();
    });
  }

  private updateDriver(): void {
    this.driverService.update(this.driverData.id, this.driverData).subscribe((response: DriverEntity) => {
      const index = this.dataSource.data.findIndex(driver => driver.id === response.id);
      this.dataSource.data[index] = response;
      this.dataSource.data = [...this.dataSource.data];
      this.showSuccessDialog();
    });
  }

  private showSuccessDialog(): void {
    const dialogRef = this.dialog.open(DialogSuccessfullyComponent, {
      data: { message: 'Driver added successfully!' }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/drivers/management']);
    });
  }

  onCancel(): void {
    this.router.navigate(['/drivers/management']);
  }
}
