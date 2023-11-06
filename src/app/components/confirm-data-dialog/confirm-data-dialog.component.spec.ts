import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDataDialogComponent } from './confirm-data-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

describe('ConfirmDataDialogComponent', () => {
  let component: ConfirmDataDialogComponent;
  let fixture: ComponentFixture<ConfirmDataDialogComponent>;
  let dialogRef: MatDialogRef<any, any>;

  const dialogData = {
    title: 'Test Title',
    description: 'Test Description',
    resume: ['Item 1', 'Item 2', 'Item 3'],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ConfirmDataDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => { } } }, { provide: MAT_DIALOG_DATA, useValue: dialogData }
      ]
    });
    fixture = TestBed.createComponent(ConfirmDataDialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize fromPage with dialog data', () => {
    expect(component.fromPage).toEqual(dialogData);
  });

  it('should close the dialog with "confirm-option" event when confirm() is called', () => {
    const dialogRefSpy = spyOn(dialogRef, 'close');
    component.confirm();
    expect(dialogRefSpy).toHaveBeenCalledWith({ event: 'confirm-option' });
  });

  it('should close the dialog with "cancel-option" event when cancel() is called', () => {
    const dialogRefSpy = spyOn(dialogRef, 'close');
    component.cancel();
    expect(dialogRefSpy).toHaveBeenCalledWith({ event: 'cancel-option' });
  });

  it('should render the title and description from dialog data', () => {
    const titleElement = fixture.nativeElement.querySelector('#title');
    expect(titleElement.textContent.trim()).toBe(dialogData.title);

    const descriptionElement = fixture.nativeElement.querySelector('p:not(#title)');
    expect(descriptionElement.textContent.trim()).toBe(dialogData.description);
  });

  it('should render the list items from dialog data', () => {
    const listItems = fixture.nativeElement.querySelectorAll('li');
    expect(listItems.length).toBe(dialogData.resume.length);

    listItems.forEach((item: { textContent: string; }, index: number) => {
      expect(item.textContent.trim()).toBe(dialogData.resume[index]);
    });
  });

  it('should call confirm() when the "Conferma" button is clicked', () => {
    const confirmButton = fixture.nativeElement.querySelector('button[color="primary"]');
    spyOn(component, 'confirm');
    confirmButton.click();
    expect(component.confirm).toHaveBeenCalled();
  });

  it('should call cancel() when the "Annulla" button is clicked', () => {
    const cancelButton = fixture.nativeElement.querySelector('button[color="accent"]');
    spyOn(component, 'cancel');
    cancelButton.click();
    expect(component.cancel).toHaveBeenCalled();
  });

});
