import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDataDialogComponent } from './confirm-data-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

describe('ConfirmDataDialogComponent', () => {
  let component: ConfirmDataDialogComponent;
  let fixture: ComponentFixture<ConfirmDataDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ConfirmDataDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: { title: "Titolo", description: "Descrizione" } }
      ]
    });
    fixture = TestBed.createComponent(ConfirmDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
