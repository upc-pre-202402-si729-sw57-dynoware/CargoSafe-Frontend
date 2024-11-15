
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {RequestServiceEntity} from "../../model/request-service.entity";
import {RequestService} from "../../service/request.service";
import {MatCard, MatCardTitle} from "@angular/material/card";
import {ToolbarContentComponent} from "../../../public/components/toolbar-content/toolbar-content.component";
import {DatePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {
  ToolbarEntrepreneurContentComponent
} from "../../../public/components/toolbar-entrepreneur-content/toolbar-entrepreneur-content.component";



@Component({
  selector: 'app-list-request-status',
  standalone: true,
  imports: [
    MatPaginator,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatCellDef,
    MatCell,
    MatHeaderCell,
    MatHeaderCellDef,
    MatColumnDef,
    MatTable,
    MatCardTitle,
    MatCard,
    MatSort,
    ToolbarContentComponent,
    DatePipe,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    ToolbarEntrepreneurContentComponent
  ],
  templateUrl: './list-request-status.component.html',
  styleUrl: './list-request-status.component.css'
})
export class ListRequestStatusComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'holderName', 'loadDetail', 'destinationAddress','pickupAddress' ,'unload_date','result'];
  dataSource = new MatTableDataSource<RequestServiceEntity>();
  searchId: string = '';
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private requestService: RequestService) {
    {
      this.dataSource.filterPredicate = (data: RequestServiceEntity, filter: string) => {
        return data.id.toString() === filter;
      };
    }
  }

  ngOnInit(): void {
    this.loadRequests();

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadRequests(): void {
    this.requestService.getAll().subscribe(requests => {
      this.dataSource.data = requests;
    });
  }
  applyFilter(): void {
    this.dataSource.filter = this.searchId.trim().toLowerCase();
  }
}
