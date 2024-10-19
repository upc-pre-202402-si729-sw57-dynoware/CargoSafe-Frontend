import {Component, EventEmitter, inject, Output, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {VehiclesEntity} from "../../model/vehicles.entity";
import {ToolbarContentComponent} from "../../../public/components/toolbar-content/toolbar-content.component";
import {VehiclesService} from "../../services/vehicles.service";
import {MatLabel} from "@angular/material/form-field";
import {
  DialogSuccessfullyComponent
} from "../../../public/components/dialogs/dialog-successfully/dialog-successfully.component";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-add-vehicles-management',
  standalone: true,
  imports: [
    FormsModule,
    MatInput,
    MatFormField,
    MatButton,
    ToolbarContentComponent,
    MatLabel,
    TranslateModule
  ],
  templateUrl: './add-vehicles-management.component.html',
  styleUrl: './add-vehicles-management.component.css'
})
export class AddVehiclesManagementComponent {
  vehicle: VehiclesEntity = new VehiclesEntity({});
  @Output() vehicleAddRequested = new EventEmitter<VehiclesEntity>();
  @ViewChild('vehicleForm', { static: false }) vehicleForm!: NgForm;

  private vehiclesService: VehiclesService = inject(VehiclesService);
  private dialog: MatDialog = inject(MatDialog);
  private router: Router = inject(Router);

  onSubmit() {
    if (this.vehicleForm.form.valid) {
      this.vehiclesService.create(this.vehicle).subscribe({
        next: (response) => {
          this.vehicleAddRequested.emit(response);
          this.showSuccessDialog();
        },
        error: (error) => {
          console.error('Error creating vehicle:', error);
        }
      });
    } else {
      console.error('Invalid form data');
    }
  }

  private showSuccessDialog(): void {
    const dialogRef = this.dialog.open(DialogSuccessfullyComponent, {
      data: { message: 'Vehicle added successfully!' }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/vehicles/management']);
    });
  }

  onCancel(): void {
    this.router.navigate(['/management/vehicle/new']);
  }

  private resetForm() {
    this.vehicle = new VehiclesEntity({});
    this.vehicleForm.resetForm();
  }
}
