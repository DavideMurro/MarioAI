import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-api-urls-input-dialog',
  templateUrl: './api-urls-input-dialog.component.html',
  styleUrls: ['./api-urls-input-dialog.component.scss'],
})
export class ApiUrlsInputDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ApiUrlsInputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
