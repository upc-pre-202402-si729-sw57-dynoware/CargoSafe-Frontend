import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {AddTripComponent} from "../add-trip/add-trip.component";
import {MatIcon} from "@angular/material/icon";
import {DatePipe, NgClass, NgIf} from "@angular/common";
import {TripEntity} from "../../model/trip.entity";
import {TripService} from "../../service/trip.service";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  ToolbarEntrepreneurContentComponent
} from "../../../public/components/toolbar-entrepreneur-content/toolbar-entrepreneur-content.component";
import {MatDialog} from "@angular/material/dialog";
import {
  DialogSuccessfullyComponent
} from "../../../public/components/dialogs/dialog-successfully/dialog-successfully.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ToolbarContentComponent} from "../../../public/components/toolbar-content/toolbar-content.component";

@Component({
  selector: 'app-list-trip',
  standalone: true,
  imports: [
    AddTripComponent,
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatSortHeader,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatIcon,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    NgClass,
    MatRowDef,
    MatPaginator,
    MatSort,
    MatButton,
    ToolbarEntrepreneurContentComponent,
    MatCard,
    MatCardHeader,
    MatCardContent,
    FormsModule,
    MatFormField,
    NgIf,
    MatInput,
    MatIconButton,
    MatCardTitle,
    DatePipe,
    ToolbarContentComponent
  ],
  templateUrl: './list-trip.component.html',
  styleUrl: './list-trip.component.css'
})
export class ListTripComponent implements OnInit, AfterViewInit {
  protected trips: TripEntity[] = [];
  protected displayedColumns: string[] = [
    'name', 'type', 'unload_direction', 'unload_location',
    'unload_date', 'destination', 'department', 'district',
    'country', 'actions'
  ];

  protected dataSource: MatTableDataSource<TripEntity> = new MatTableDataSource();

  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private tripService: TripService = inject(TripService);
  private dialog: MatDialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadTrips();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  protected loadTrips(): void {
    this.tripService.getAll().subscribe((trips: TripEntity[]) => {
      this.dataSource.data = trips;
    });
  }

  protected acceptTrip(trip: TripEntity): void {

    //pending add acceptTrip logic !!
    this.openSuccessDialog('Viaje aceptado satisfactoriamente');
  }

  protected rejectTrip(trip: TripEntity): void {
    //pending add rejectTrip logic !!
    this.openSuccessDialog('Viaje rechazado satisfactoriamente');
  }

  protected openSuccessDialog(message: string): void {
    this.dialog.open(DialogSuccessfullyComponent, {
      data: { message }
    });
  }
}
