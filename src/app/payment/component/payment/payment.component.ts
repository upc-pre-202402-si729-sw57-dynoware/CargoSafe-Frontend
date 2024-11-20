import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {PaymentEntity} from "../../model/payment.entity";
import {PaymentService} from "../../service/payment.service";
import {ToolbarContentComponent} from "../../../public/components/toolbar-content/toolbar-content.component";
import {
  ToolbarEntrepreneurContentComponent
} from "../../../public/components/toolbar-entrepreneur-content/toolbar-entrepreneur-content.component";
import {CurrencyPipe, DatePipe, NgIf} from "@angular/common";
import {TripEntity} from "../../../trip/model/trip.entity";
import {TripService} from "../../../trip/service/trip.service";
import {DriverService} from "../../../drivers/services/driver.service";
import {VehiclesService} from "../../../vehicles/services/vehicles.service";

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    FormsModule,
    ToolbarContentComponent,

    NgIf,
    DatePipe,
    CurrencyPipe,
    ToolbarEntrepreneurContentComponent
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})

/**
 * Payment Component
 * This class is in charge of managing the payment component
 * @implements OnInit
 */

export class PaymentComponent implements OnInit {
  payment: PaymentEntity = new PaymentEntity();
  trip: TripEntity | undefined;
  driverName: string = '';
  vehiclePlate: string = '';

  constructor(
    private paymentService: PaymentService,
    private tripService: TripService,
    private driverService: DriverService,
    private vehicleService: VehiclesService
  ) {}

  ngOnInit(): void {
    this.loadTripDetails();
  }

  /**
   * Load Trip Details
   * This method is in charge of loading the trip details
   * @returns void
   */

  loadTripDetails(): void {
    const tripId = 1;
    this.tripService.getById(tripId).subscribe(
      trip => {
        this.trip = trip;
        this.loadDriverName(trip.driverId);
        this.loadVehiclePlate(trip.vehicleId);
      },
      error => console.error('Error loading trip details:', error)
    );
  }

  /**
   * Load Driver Name
   * @param driverId
   * This method is in charge of loading the driver name
   */

  loadDriverName(driverId: number): void {
    this.driverService.getById(driverId).subscribe(
      driver => this.driverName = driver.name,
      error => console.error('Error loading driver name:', error)
    );
  }

  /**
   * Load Vehicle Plate
   * @param vehicleId
   * This method is in charge of loading the vehicle plate
   */

  loadVehiclePlate(vehicleId: number): void {
    this.vehicleService.getById(vehicleId).subscribe(
      vehicle => this.vehiclePlate = vehicle.plate,
      error => console.error('Error loading vehicle plate:', error)
    );
  }

  /**
   * On Submit
   * This method is in charge of submitting the payment
   * @returns
   */

  onSubmit(): void {
    this.paymentService.processPayment(this.payment).subscribe(
      response => {
        console.log('Payment processed successfully', response);
      },
      error => {
        console.error('Error processing payment', error);
      }
    );
  }
}
