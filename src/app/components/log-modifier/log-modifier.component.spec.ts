import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LogModifierComponent } from './log-modifier.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { QualityattributeModel } from 'src/app/api/models';
import { ActiveAttributesService } from 'src/app/services/active-attributes/active-attributes.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDataDialogComponent } from '../confirm-data-dialog/confirm-data-dialog.component';

describe('LogModifierComponent', () => {
  let component: LogModifierComponent;
  let fixture: ComponentFixture<LogModifierComponent>;
  let httpTestingController: HttpTestingController;
  let snackBar: MatSnackBar;
  let activeAttributesService: jasmine.SpyObj<ActiveAttributesService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  const mockAttributes: QualityattributeModel[] = [
    { attributename: 'Attribute1', attributevaluetype: 'S' },
    { attributename: 'Attribute2', attributevaluetype: 'N' },
  ];

  beforeEach(() => {
    activeAttributesService = jasmine.createSpyObj('ActiveAttributesService', ['getActiveAttributes']);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [LogModifierComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatTooltipModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: MatSnackBar, useValue: { open: () => { } } },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: ActiveAttributesService, useValue: activeAttributesService }
      ]
    });
    fixture = TestBed.createComponent(LogModifierComponent);
    snackBar = TestBed.inject(MatSnackBar);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    activeAttributesService.getActiveAttributes.and.returnValue(of(mockAttributes));
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize attributes and form on ngOnInit', () => {
    activeAttributesService.getActiveAttributes.and.returnValue(of(mockAttributes));
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.activeAttributes).toEqual(mockAttributes);
    expect(component.displayedColumns).toEqual(mockAttributes.map((attr) => attr.attributename!));
    expect(component.form).toBeInstanceOf(FormGroup);
  });

  it('should open a dialog for adding a log and handle the "confirm-option"', () => {
    activeAttributesService.getActiveAttributes.and.returnValue(of(mockAttributes));
    component = fixture.componentInstance;
    fixture.detectChanges();
    const openSnackBarSpy = spyOn(snackBar, 'open');
    const formData = ['Attribute1: TestValue', 'Attribute2: 42'];

    mockMatDialog.open.and.returnValue({
      afterClosed: () => of({ event: 'confirm-option' }),
    } as any);

    component.addLog = true;

    component.form.setControl('control-0', new FormControl('TestValue', Validators.required));
    component.form.setControl('control-1', new FormControl(42, Validators.required));

    component.addDialog();

    expect(mockMatDialog.open).toHaveBeenCalledWith(ConfirmDataDialogComponent, {
      data: { title: 'Aggiungi un log', description: 'Dati inseriti:', resume: formData },
    });

    expect(openSnackBarSpy).not.toHaveBeenCalled();
  });

  it('should open a dialog for adding a log and handle the "cancel-option"', () => {
    activeAttributesService.getActiveAttributes.and.returnValue(of(mockAttributes));
    component = fixture.componentInstance;
    fixture.detectChanges();
    const openSnackBarSpy = spyOn(snackBar, 'open');
    const formData = ['Attribute1: TestValue', 'Attribute2: 42'];

    mockMatDialog.open.and.returnValue({
      afterClosed: () => of({ event: 'cancel-option' }),
    } as any);

    component.addLog = true;

    component.form.setControl('control-0', new FormControl('TestValue', Validators.required));
    component.form.setControl('control-1', new FormControl(42, Validators.required));

    component.addDialog();

    expect(mockMatDialog.open).toHaveBeenCalledWith(ConfirmDataDialogComponent, {
      data: { title: 'Aggiungi un log', description: 'Dati inseriti:', resume: formData },
    });

    expect(openSnackBarSpy).not.toHaveBeenCalled();
  });

  it('should open a dialog for updating a log and handle the "confirm-option"', () => {
    activeAttributesService.getActiveAttributes.and.returnValue(of(mockAttributes));
    component = fixture.componentInstance;
    fixture.detectChanges();
    const openSnackBarSpy = spyOn(snackBar, 'open');
    const formData = ['Attribute1: UpdatedValue', 'Attribute2: 45'];

    mockMatDialog.open.and.returnValue({
      afterClosed: () => of({ event: 'confirm-option' }),
    } as any);

    component.addLog = false;
    component.form.setControl('control-0', new FormControl('UpdatedValue', Validators.required));
    component.form.setControl('control-1', new FormControl(45, Validators.required));

    component.updateDialog();

    expect(mockMatDialog.open).toHaveBeenCalledWith(ConfirmDataDialogComponent, {
      data: {
        title: 'Modifica il log selezionato',
        description: 'Dati aggiornati:',
        resume: formData
      },
    });

    expect(openSnackBarSpy).not.toHaveBeenCalled();
  });

  it('should open a dialog for updating a log and handle the "cancel-option"', () => {
    activeAttributesService.getActiveAttributes.and.returnValue(of(mockAttributes));
    component = fixture.componentInstance;
    fixture.detectChanges();
    const openSnackBarSpy = spyOn(snackBar, 'open');
    const formData = ['Attribute1: UpdatedValue', 'Attribute2: 45'];

    mockMatDialog.open.and.returnValue({
      afterClosed: () => of({ event: 'cancel-option' }),
    } as any);

    component.addLog = false;

    component.form.setControl('control-0', new FormControl('UpdatedValue', Validators.required));
    component.form.setControl('control-1', new FormControl(45, Validators.required));

    component.updateDialog();

    expect(mockMatDialog.open).toHaveBeenCalledWith(ConfirmDataDialogComponent, {
      data: {
        title: 'Modifica il log selezionato',
        description: 'Dati aggiornati:',
        resume: formData
      },
    });

    expect(openSnackBarSpy).not.toHaveBeenCalled();
  });

  it('should clear the dialog', () => {
    activeAttributesService.getActiveAttributes.and.returnValue(of(mockAttributes));
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.form.setControl('control-0', new FormControl('TestValue'));
    component.form.setControl('control-1', new FormControl(42));


    component.clearDialog();

    expect(component.form.value).toEqual({ 'control-0': '', 'control-1': '' });
  });

  it('should open a snackbar when no attributes are available', () => {
    const openSnackBarSpy = spyOn(snackBar, 'open');
    activeAttributesService.getActiveAttributes.and.returnValue(of([]));
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(openSnackBarSpy).toHaveBeenCalledWith('Errore: non sono disponibili attributi per la fase selezionata!', 'X', { panelClass: ['red-snackbar'] });
  });

});
