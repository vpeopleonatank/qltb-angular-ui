import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { DevicesService } from 'src/app/core/services/device.service';
import { Donvi } from 'src/app/core/models/donvi.model';
import { LoaiThietBi } from 'src/app/core/models/LoaiThietBi.model';

export interface DeviceDialogData {
  tentb: string;
  nuocsx: string;
  madv: number;
  maloai: number;
  matb: number;
  // donvis: Donvi[];
  // loaithietbis: LoaiThietBi[];
}

@Component({
  selector: 'app-add-edit-device',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './add-edit-device.component.html',
  styleUrls: ['./add-edit-device.component.css'],
})
export class AddEditDeviceComponent implements OnInit {
  deviceForm: FormGroup;

  donVi: { [key: number]: string } = { 1: 'don vi 1', 2: 'donvi 2', 3: 'don vi 3' };
  donVis: Donvi[] = [];
  loaiThietBis: LoaiThietBi[] = [];
  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<AddEditDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeviceDialogData,
    private devicesService: DevicesService
  ) {
    this.deviceForm = this._fb.group({
      tentb: '',
      nuocsx: '',
      madv: '',
      maloai: '',
    });
  }

  ngOnInit() {
    this.devicesService.getDonVis()
      .subscribe({
        next: (val) => {
          this.donVis = val.donviDTOs;
        },
        error: (err) => {
          console.log(err);
        }
      });
      this.devicesService.getLoaiThietBis()
      .subscribe({
        next: (val) => {
          this.loaiThietBis = val.loaiThietbiDTOs;
        },
        error: (err) => {
          console.log(err);
        }
      })
      this.deviceForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.deviceForm.valid) {
      if (this.data) {
        this.devicesService.update(this.data.matb, this.deviceForm.value).subscribe({
          next: (data) => {
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this.devicesService.add(this.deviceForm.value).subscribe({
          next: (data) => {
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
