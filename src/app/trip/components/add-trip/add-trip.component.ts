import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { TripEntity } from "../../model/trip.entity";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import { NgIf } from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatLabel,
    MatFormField,
    MatInput,
    FormsModule,
    MatButton,
    NgIf,
    MatCardTitle,
    MatError,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css'
})
export class AddTripComponent {
  @Input() trip: TripEntity = new TripEntity({});
  @Input() editMode: boolean = false;
  @Output() tripAddRequested = new EventEmitter<TripEntity>();
  @Output() tripUpdateRequested = new EventEmitter<TripEntity>();
  @Output() cancelRequested = new EventEmitter();
  @ViewChild('tripForm', { static: false }) tripForm!: NgForm;


  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.trip.unload_location = `Lat: ${latitude}, Lon: ${longitude}`;

        this.tripForm.controls['location'].setErrors(null);
      }, (error) => {
        console.error("Error obteniendo la ubicación: ", error);
      });
    } else {
      console.error("Geolocalización no es soportada por este navegador.");
    }
  }


  private resetEditState() {
    this.trip = new TripEntity({});
    this.editMode = false;
    this.tripForm.resetForm();
  }


  onSubmit() {
    if (this.tripForm.valid) {
      const emitter = this.editMode ? this.tripUpdateRequested : this.tripAddRequested;
      emitter.emit(this.trip);
      this.resetEditState();
    } else {
      console.error('Datos del formulario no válidos');
    }
  }


  onCancel() {
    this.cancelRequested.emit();
    this.resetEditState();
  }

  openMap() {
    const mapWindow = window.open(`https://www.google.com/maps/@?api=1&map_action=map&center=0,0&zoom=2`, '_blank', 'width=800,height=600');

  }
}
