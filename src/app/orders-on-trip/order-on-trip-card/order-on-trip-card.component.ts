import {AfterViewInit, Component, EventEmitter, inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {OrderOnTripEntity} from "../model/order-on-trip.entity";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {OrderOnTripService} from "../service/order-on-trip.service";
import {MatButton} from "@angular/material/button";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {FormsModule, NgForm} from "@angular/forms";
import {MatNativeDateModule} from "@angular/material/core";
import {ToolbarContentComponent} from "../../public/components/toolbar-content/toolbar-content.component";

@Component({
  selector: 'app-order-on-trip-card',
  standalone: true,
  imports: [
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatButton,
    MatPaginator,
    MatRow,
    MatHeaderRow,
    MatTable,
    MatSort,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    NgForOf,
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatCardActions,
    NgIf,
    FormsModule,
    MatCardTitle,
    MatCardSubtitle,
    DatePipe,
    MatNativeDateModule,
    ToolbarContentComponent
  ],
  templateUrl: './order-on-trip-card.component.html',
  styleUrl: './order-on-trip-card.component.css'
})

/**
 * OrderOnTripCardComponent
 * This class is in charge of managing the order on trip card component
 */
export class OrderOnTripCardComponent {
  @Input() orderOnTrip!: OrderOnTripEntity;
  @Input() editMode: boolean = false;
  @Output() orderOnTripAddRequested = new EventEmitter<OrderOnTripEntity>();
  @Output() orderOnTripUpdateRequested = new EventEmitter<OrderOnTripEntity>();
  @Output() cancelRequested = new EventEmitter();
  @ViewChild('orderOnTripForm', {static: false}) orderOnTripForm!: NgForm;

// Methods
  constructor() {
    this.orderOnTrip = new OrderOnTripEntity({});
  }


  /**
   * Reset Edit State
   * @private
   * @param void
   * This function is in charge of resetting the edit state
   */
  private resetEditState() {
    this.orderOnTrip = new OrderOnTripEntity({});
    this.editMode = false;
    this.orderOnTripForm.resetForm();
  }

  /**
   * On Submit
   * @param void
   * This function is in charge of submitting the form
   */

  onSubmit() {
    if (this.orderOnTripForm.form.valid) {
      let emitter = this.editMode ? this.orderOnTripUpdateRequested : this.orderOnTripAddRequested;
      emitter.emit(this.orderOnTrip);
      this.resetEditState();
    } else {
      console.error('Invalid form data');
    }
  }

  /**
   * On Cancel
   * @param void
   * This function is in charge of canceling the form
   */

  onCancel() {
    this.cancelRequested.emit();
    this.resetEditState();
  }

}
