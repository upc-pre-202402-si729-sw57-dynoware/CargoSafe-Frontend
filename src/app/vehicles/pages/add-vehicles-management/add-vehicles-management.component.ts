import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {VehiclesEntity} from "../../model/vehicles.entity";
import {ToolbarContentComponent} from "../../../public/components/toolbar-content/toolbar-content.component";
import {VehiclesService} from "../../services/vehicles.service";
import {MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-add-vehicles-management',
  standalone: true,
  imports: [
    FormsModule,
    MatInput,
    MatFormField,
    MatButton,
    ToolbarContentComponent,
    MatLabel
  ],
  templateUrl: './add-vehicles-management.component.html',
  styleUrl: './add-vehicles-management.component.css'
})
export class AddVehiclesManagementComponent {
  vehicle: VehiclesEntity = new VehiclesEntity({});
  @Output() vehicleAddRequested = new EventEmitter<VehiclesEntity>();
  @ViewChild('vehicleForm', { static: false }) vehicleForm!: NgForm;

  constructor(private vehiclesService: VehiclesService) {}

  onSubmit() {
    if (this.vehicleForm.form.valid) {
      this.vehiclesService.create(this.vehicle).subscribe({
        next: (response) => {
          this.vehicleAddRequested.emit(response);
          this.resetForm();
        },
        error: (error) => {
          console.error('Error creating vehicle:', error);
        }
      });
    } else {
      console.error('Invalid form data');
    }
  }

  private resetForm() {
    this.vehicle = new VehiclesEntity({});
    this.vehicleForm.resetForm();
  }
}
