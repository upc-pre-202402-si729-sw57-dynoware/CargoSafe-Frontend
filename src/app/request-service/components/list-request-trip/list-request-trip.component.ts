import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {AddRequestTripComponent} from "../add-request-trip/add-request-trip.component";
import {MatIcon} from "@angular/material/icon";
import {DatePipe, NgClass, NgIf} from "@angular/common";
import {TripEntity} from "../../../trip/model/trip.entity";
import {TripService} from "../../../trip/service/trip.service";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  ToolbarEntrepreneurContentComponent
} from "../../../public/components/toolbar-entrepreneur-content/toolbar-entrepreneur-content.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ToolbarContentComponent} from "../../../public/components/toolbar-content/toolbar-content.component";
import {RequestServiceEntity} from "../../model/request-service.entity";
import {RequestService} from "../../service/request.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-list-request-trip',
  standalone: true,
  imports: [
    AddRequestTripComponent,
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
    ToolbarContentComponent,
    MatSelect,
    MatOption
  ],
  templateUrl: './list-request-trip.component.html',
  styleUrl: './list-request-trip.component.css'
})
export class ListRequestTripComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'holderName', 'loadDetail', 'destinationAddress','pickupAddress' ,'unload_date', 'actions'];
  dataSource = new MatTableDataSource<RequestServiceEntity>();
  columns = [
    { def: 'id', header: 'ID' },
    { def: 'holderName', header: 'Cliente' },
    { def: 'loadDetail', header: 'Detalles del pedido' },
    { def: 'destinationAddress', header: 'Ubicación de Descarga' },
    { def: 'pickupAddress', header: 'Ubicacion de carga' },
    { def: 'unload_date', header: 'Fecha de Solicitud' },
    { def: 'actions', header: 'Acciones' },
    { def: 'district', header: 'Distrito' },
    { def: 'country', header: 'País' }
  ];
  searchId: string = '';
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private requestService: RequestService,
    private tripService: TripService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.dataSource.filterPredicate = (data: RequestServiceEntity, filter: string) => {
      return data.id.toString() === filter;
    };
  }

  ngOnInit(): void {
    this.loadRequests();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadRequests(): void {
    this.requestService.getAll().subscribe(
      requests => this.dataSource.data = requests,
      error => this.handleError('Error loading requests', error)
    );
  }

  acceptTrip(trip: RequestServiceEntity): void {
    trip.statusId = 1;
    this.requestService.update(trip.id, trip).subscribe(
      () => this.createTrip(trip),
      error => this.handleError('Error accepting trip', error)
    );
  }

  rejectTrip(trip: RequestServiceEntity): void {
    trip.statusId = 2;
    this.requestService.update(trip.id, trip).subscribe(
      () => {
        this.snackBar.open('Solicitud rechazada', 'Cerrar', { duration: 2000 });
        this.loadRequests();
      },
      error => this.handleError('Error rejecting trip', error)
    );
  }

  addDetails(requestId: number): void {
    this.router.navigate(['/trip/details', requestId]);
  }

  isTripAccepted(tripId: number): boolean {
    return this.requestService.hasTrip(tripId);
  }

  updateStatus(trip: RequestServiceEntity): void {
    this.requestService.update(trip.id, trip).subscribe(
      () => {
        this.snackBar.open('Status updated successfully', 'Cerrar', { duration: 2000 });
        if (trip.statusId === 1) {
          this.acceptTrip(trip);
        } else if (trip.statusId === 2) {
          this.rejectTrip(trip);
        } else {
          this.loadRequests();
        }
      },
      error => this.handleError('Error updating status', error)
    );
  }

  private createTrip(trip: RequestServiceEntity): void {
    const newTrip = new TripEntity({
      id: trip.id,
      type: trip.type,
      unloadDirection: trip.unloadDirection,
      unloadLocation: trip.unloadLocation,
      unloadDate: trip.unloadDate,
      destination: trip.destination,
      department: trip.department,
      district: trip.district,
      country: trip.country,
      numberPackages: trip.numberPackages,
      holderName: trip.holderName,
      loadDetail: trip.loadDetail,
      destinationAddress: trip.destinationAddress,
      pickupAddress: trip.pickupAddress
    });
    this.tripService.create(newTrip).subscribe(
      () => {
        this.snackBar.open('Solicitud aceptada y convertida a viaje', 'Cerrar', { duration: 2000 });
        this.loadRequests();
      },
      error => this.handleError('Error creating trip', error)
    );
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchId.trim().toLowerCase();
  }
  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.snackBar.open(message, 'Cerrar', { duration: 2000 });
  }
}
