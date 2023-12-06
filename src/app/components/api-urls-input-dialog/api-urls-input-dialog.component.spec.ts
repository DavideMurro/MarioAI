import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiUrlsInputDialogComponent } from './api-urls-input-dialog.component';

describe('ApiUrlsInputDialogComponent', () => {
  let component: ApiUrlsInputDialogComponent;
  let fixture: ComponentFixture<ApiUrlsInputDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiUrlsInputDialogComponent],
    });
    fixture = TestBed.createComponent(ApiUrlsInputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
