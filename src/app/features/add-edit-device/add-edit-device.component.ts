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

export interface DeviceDialogData {
  tenTb: string;
  nuocSx: string;
  donVi: number;
  loaiThietBi: number;
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

  donVi: { [key: number]: string } = { 2: 'donvi 1', 1: 'don vi 2' };
  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<AddEditDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeviceDialogData
  ) {
    this.deviceForm = this._fb.group({
      tenTb: '',
      nuocSx: '',
      donVi: '',
      loaiThietBi: '',
    });
  }

  ngOnInit() {
    this.deviceForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.deviceForm.valid) {
      console.log(this.data)
      if (this.data) {
      }
    }
  }
}
