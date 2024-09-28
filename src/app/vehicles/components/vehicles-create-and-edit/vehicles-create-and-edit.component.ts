import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {VehicleEntity} from "../../model/vehicle.entity";
import {FormsModule, NgForm} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-vehicles-create-and-edit',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatInput,
    MatButton,
    NgIf
  ],
  templateUrl: './vehicles-create-and-edit.component.html',
  styleUrl: './vehicles-create-and-edit.component.css'
})
export class VehiclesCreateAndEditComponent {

  @Input() vehicle!: VehicleEntity;
  @Input() editMode: boolean = false;
  @Output() vehicleAddRequested = new EventEmitter<VehicleEntity>();
  @Output() vehicleUpdateRequested = new EventEmitter<VehicleEntity>();
  @Output() cancelRequested = new EventEmitter();
  @ViewChild('vehicleForm', { static: false }) vehicleForm!: NgForm;


  constructor() {
    this.vehicle = new VehicleEntity({});
  }


  private resetEditState() {
    this.vehicle = new VehicleEntity({});
    this.editMode = false;
    this.vehicleForm.resetForm();
  }


  onSubmit() {
    if (this.vehicleForm.form.valid) {
      let emitter = this.editMode ? this.vehicleUpdateRequested : this.vehicleAddRequested;
      emitter.emit(this.vehicle);
      this.resetEditState();
    } else {
      console.error('Invalid form data');
    }
  }

  onCancel() {
    this.cancelRequested.emit();
    this.resetEditState();
  }
}
