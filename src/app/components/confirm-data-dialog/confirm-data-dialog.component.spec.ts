import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDataDialogComponent } from './confirm-data-dialog.component';

describe('ConfirmDataDialogComponent', () => {
  let component: ConfirmDataDialogComponent;
  let fixture: ComponentFixture<ConfirmDataDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDataDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
