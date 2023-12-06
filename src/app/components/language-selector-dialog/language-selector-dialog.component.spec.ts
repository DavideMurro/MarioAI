import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSelectorDialogComponent } from './language-selector-dialog.component';

describe('LanguageSelectorDialogComponent', () => {
  let component: LanguageSelectorDialogComponent;
  let fixture: ComponentFixture<LanguageSelectorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageSelectorDialogComponent]
    });
    fixture = TestBed.createComponent(LanguageSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
