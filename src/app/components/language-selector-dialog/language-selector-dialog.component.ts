import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Language } from 'src/app/models/language.model';
import { LanguagesData } from 'src/app/models/languages-data.model';

@Component({
  selector: 'app-language-selector-dialog',
  templateUrl: './language-selector-dialog.component.html',
  styleUrls: ['./language-selector-dialog.component.scss'],
})
export class LanguageSelectorDialogComponent {
  public languages: Language[];
  public languageForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<LanguageSelectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: LanguagesData
  ) {
    this.languages = this.data.languages;
    this.languageForm = new FormGroup({
      languageCode: new FormControl(this.data.selectedLanguageCode, [
        Validators.required,
      ]),
    });
  }

  public onLanguageFormSubmit() {
    let dataReturn: string = this.languageForm.value.languageCode;
    this.dialogRef.close(dataReturn);
  }

  public onLanguageFormCancel() {
    this.dialogRef.close();
  }
}
