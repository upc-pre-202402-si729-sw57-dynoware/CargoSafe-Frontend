
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
    DatePipe
  ],
  templateUrl: './list-request-status.component.html',
  styleUrl: './list-request-status.component.css'
})
export class ListRequestStatusComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'type', 'unload_direction', 'unload_location', 'unload_date', 'destination', 'department', 'district', 'country', 'result'];
  dataSource = new MatTableDataSource<RequestServiceEntity>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private requestService: RequestService) {}

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
}
