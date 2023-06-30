import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DeviceListConfig } from 'src/app/core/models/device-list-config.model';
import { DeviceListComponent } from '../device-list/device-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, DeviceListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent{
  listConfig: DeviceListConfig = {
    type: 'all',
    filters: {},
  };
}
