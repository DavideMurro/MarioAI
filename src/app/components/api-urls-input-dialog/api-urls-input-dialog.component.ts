import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiUrlsData } from 'src/app/models/api-urls-data.model';

@Component({
  selector: 'app-api-urls-input-dialog',
  templateUrl: './api-urls-input-dialog.component.html',
  styleUrls: ['./api-urls-input-dialog.component.scss'],
})
export class ApiUrlsInputDialogComponent {
  public apiUrlsForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ApiUrlsInputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ApiUrlsData
  ) {
    this.apiUrlsForm = new FormGroup({
      stableDiffusionApiUrl: new FormControl(this.data.stableDiffusionApiUrl, [
        Validators.required,
      ]),
    });
  }

  public onApiUrlsFormSubmit() {
    let dataReturn: ApiUrlsData = this.apiUrlsForm.getRawValue();
    this.dialogRef.close(dataReturn);
  }

  public onApiUrlsFormCancel() {
    this.dialogRef.close();
  }
}
