import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DeviceListConfig } from 'src/app/core/models/device-list-config.model';
import { DeviceListComponent } from '../device-list/device-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddEditDeviceComponent } from '../add-edit-device/add-edit-device.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, DeviceListComponent, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  listConfig: DeviceListConfig = {
    type: 'all',
    filters: {},
  };
  constructor(private _dialog: MatDialog) {}
  openAddEditDeviceForm() {
    const dialogRef = this._dialog.open(AddEditDeviceComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          // this.getEmployeeList();
        }
      },
    });
  }
}
