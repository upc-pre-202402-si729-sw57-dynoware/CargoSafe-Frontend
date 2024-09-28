import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [],
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
