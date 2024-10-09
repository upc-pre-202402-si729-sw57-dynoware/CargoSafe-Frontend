import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { TripEntity } from "../../model/trip.entity";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import { NgIf } from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MapComponent} from "../../../request-service/component/map/map.component";
import {MatDialog} from "@angular/material/dialog";

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

  constructor(private dialog: MatDialog) {}


  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => this.setLocation(position),
        (error) => console.error("Error fetching location: ", error)
      );
    } else {
      console.error("Geolocation not supported by this browser");
    }
  }



  private setLocation(position: GeolocationPosition) {
    if (position && position.coords) {
      const {latitude, longitude} = position.coords;
      this.trip.unload_location = `Lat: ${latitude}, Lon: ${longitude}`;
      this.tripForm.controls['location'].setErrors(null);
    } else {
      console.error("Invalid position object");
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
      console.error("Invalid Data");
    }
  }


  onCancel() {
    this.cancelRequested.emit();
    this.resetEditState();
  }

  openMap() {
    const dialogRef = this.dialog.open(MapComponent);

    dialogRef.componentInstance.locationSelected.subscribe((location: { latitude: number, longitude: number }) => {
      const formattedDestination = `Lat: ${location.latitude}, Lon: ${location.longitude}`;
      this.trip.destination = formattedDestination;
      this.tripForm.controls['destination'].setValue(formattedDestination);
    });
  }

  getLatitude(destination: string): string {
    const latMatch = destination.match(/Lat:\s*(-?\d+(\.\d+)?)/);
    return latMatch && latMatch[1] ? latMatch[1] : 'undefined';
  }

  getLongitude(destination: string): string {
    const lngMatch = destination.match(/Lon:\s*(-?\d+(\.\d+)?)/);
    return lngMatch && lngMatch[1] ? lngMatch[1] : 'undefined';
  }
}
