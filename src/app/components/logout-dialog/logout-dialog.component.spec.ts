import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutDialogComponent } from './logout-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

describe('LogoutDialogComponent', () => {
  let component: LogoutDialogComponent;
  let fixture: ComponentFixture<LogoutDialogComponent>;
  let dialogRef: MatDialogRef<any, any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoutDialogComponent],
      imports: [
        MatDialogModule,
        TranslateModule.forRoot()
      ],
      providers: [{ provide: MatDialogRef, useValue: { close: () => { } } }, { provide: MAT_DIALOG_DATA, useValue: { title: "Titolo", description: "Descrizione" } }]
    });
    fixture = TestBed.createComponent(LogoutDialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize fromPage with dialog data', () => {
    expect(component.fromPage).toEqual({ title: "Titolo", description: "Descrizione" });
  });

  it('should close the dialog with "stay-option" event when stay() is called', () => {
    const dialogRefSpy = spyOn(dialogRef, 'close')
    component.stay();
    expect(dialogRefSpy).toHaveBeenCalledWith({ event: 'stay-option' });
  });

  it('should close the dialog with "exit-option" event when exit() is called', () => {
    const dialogRefSpy = spyOn(dialogRef, 'close')
    component.exit();
    expect(dialogRefSpy).toHaveBeenCalledWith({ event: 'exit-option' });
  });

  it('should render the title and description from dialog data', () => {
    const titleElement = fixture.nativeElement.querySelector('#title');
    expect(titleElement.textContent.trim()).toBe("Titolo");

    const descriptionElement = fixture.nativeElement.querySelector('p:not(#title)');
    expect(descriptionElement.textContent.trim()).toBe("Descrizione");
  });

  it('should call stay() when the "Rimani" button is clicked', () => {
    const stayButton = fixture.nativeElement.querySelector('button[color="primary"]');
    spyOn(component, 'stay');
    stayButton.click();
    expect(component.stay).toHaveBeenCalled();
  });

  it('should call exit() when the "Esci" button is clicked', () => {
    const exitButton = fixture.nativeElement.querySelector('button[color="accent"]');
    spyOn(component, 'exit');
    exitButton.click();
    expect(component.exit).toHaveBeenCalled();
  });
});
