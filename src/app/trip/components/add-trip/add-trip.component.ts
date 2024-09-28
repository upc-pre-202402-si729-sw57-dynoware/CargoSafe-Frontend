import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Trip} from "../../model/trip.entity";
import {FormsModule, NgForm} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {NgIf} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatButton,
    NgIf,
    MatLabel,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle
  ],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css'
})
export class AddTripComponent {
  @Input() trip!: Trip;
  @Input() editMode: boolean = false;
  @Output() tripAddRequested = new EventEmitter<Trip>();
  @Output() tripUpdateRequested = new EventEmitter<Trip>();
  @Output() cancelRequested = new EventEmitter();
  @ViewChild('tripForm', { static: false }) tripForm!: NgForm;
  constructor() {
    this.trip = new Trip({});
  }
  private resetEditState() {
    this.trip = new Trip({});
    this.editMode = false;
    this.tripForm.resetForm();
  }

  // Event Handlers
  onSubmit() {
    if (this.tripForm.form.valid) {
      let emitter = this.editMode ? this.tripUpdateRequested : this.tripAddRequested;
      emitter.emit(this.trip);
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
