import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceListConfig } from 'src/app/core/models/device-list-config.model';
import { LoadingState } from 'src/app/core/models/loading-state.model';
import { Device } from 'src/app/core/models/device.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DevicesService } from 'src/app/core/services/device.service';
import { AddEditDeviceComponent } from '../add-edit-device/add-edit-device.component';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
})
export class DeviceListComponent implements OnInit {
  displayedColumns: string[] = [
    'matb',
    'madv',
    'maloai',
    'tentb',
    'nuocsx',
    'tendv',
    'tenloaitb',
    'action'
  ];

  query!: DeviceListConfig;
  currentPage = 1;
  totalPages: Array<number> = [];
  loading = LoadingState.NOT_LOADED;
  LoadingState = LoadingState;
  destroy$ = new Subject<void>();

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() limit!: number;
  @Input()
  set config(config: DeviceListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }
  
  @Input() addBtnPressed: Subject<boolean> = new Subject();

  constructor(
    private _dialog: MatDialog,
    private devicesService: DevicesService
  ) {}

  public ngOnInit(): void {
    this.addBtnPressed.subscribe(v => {
      this.runQuery();
    });
  }

  setPageTo(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.runQuery();
  }

  openEditForm(data: any) {

    const dialogRef = this._dialog.open(AddEditDeviceComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.runQuery();
        }
      },
    });
  }

  deleteDevice(data: number) {
    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.devicesService.delete(val)
            .subscribe({
              next: () => {
                this.runQuery();

              },
              error: () => {

              }
            })
        }
      },
    });
  }

  runQuery() {
    this.loading = LoadingState.LOADING;

    // Create limit and offset filter (if necessary)
    if (this.limit) {
      this.query.filters.PageSize = this.limit;
      this.query.filters.PageNumber = this.currentPage;
    }

    this.devicesService
      .query(this.query)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.loading = LoadingState.LOADED;

        this.dataSource = new MatTableDataSource(data.devices);
        this.dataSource.sort = this.sort;
        this.paginator.length = data.devicesCount;

        // this.paginator.pageSize = this.query.filters.PageSize;
        // this.dataSource.paginator = this.paginator;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
