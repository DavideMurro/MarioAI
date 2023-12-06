import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-language-selector-dialog',
  templateUrl: './language-selector-dialog.component.html',
  styleUrls: ['./language-selector-dialog.component.scss'],
})
export class LanguageSelectorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LanguageSelectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
