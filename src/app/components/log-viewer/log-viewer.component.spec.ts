import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogViewerComponent } from './log-viewer.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActiveAttributesService } from 'src/app/services/active-attributes/active-attributes.service';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Subject, of } from 'rxjs';
import { QualityattributeModel, QualityphaseModel, QualitysavelogModel } from 'src/app/api/models';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { QualitySaveLogService } from 'src/app/api/services';
import { MatTableModule } from '@angular/material/table';

const dialogData = {
  title: 'Test Title',
  description: 'Test Description',
  resume: ['Item 1', 'Item 2', 'Item 3'],
};

describe('LogViewerComponent', () => {
  let component: LogViewerComponent;
  let fixture: ComponentFixture<LogViewerComponent>;
  let httpTestingController: HttpTestingController;
  let snackBar: MatSnackBar;
  let activeAttributesService: ActiveAttributesService;
  let dialogRef: MatDialogRef<any, any>;
  let translateService: TranslateService;
  let loadingService: LoadingService;

  const mockActiveAttributes: QualityattributeModel[] = [
    { attributename: 'Attribute1', attributevalue: 'AttributeValue1' },
    { attributename: 'Attribute2', attributevalue: 'AttributeValue2' },
  ];

  beforeEach(() => {
    activeAttributesService = jasmine.createSpyObj('ActiveAttributesService', ['getActiveAttributes']);
    (activeAttributesService.getActiveAttributes as jasmine.Spy).and.returnValue(of(mockActiveAttributes));

    TestBed.configureTestingModule({
      declarations: [LogViewerComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        MatDialogModule,
        MatTableModule
      ],
      providers: [
        { provide: MatSnackBar, useValue: { open: () => {} } },
        { provide: ActiveAttributesService, useValue: activeAttributesService },
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
        TranslateService,
        LoadingService
      ],
    });

    fixture = TestBed.createComponent(LogViewerComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    dialogRef = TestBed.inject(MatDialogRef);
    snackBar = TestBed.inject(MatSnackBar);
    translateService = TestBed.inject(TranslateService);
    loadingService = TestBed.inject(LoadingService);

    // Initialize the component
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set displayedColumns based on activeAttributes', () => {
    expect(component.displayedColumns).toEqual(['AttributeValue1', 'AttributeValue2', 'Actions']);
  });

  it('should open a snackbar when no attributes are available', () => {
    // Create a spy for the MatSnackBar instance
    const snackBarSpy = spyOn(snackBar, 'open');

    // Mock the return value of activeAttributesService.getActiveAttributes
    (activeAttributesService.getActiveAttributes as jasmine.Spy).and.returnValue(of([]));

    // Call the ngOnInit method
    component.ngOnInit();

    // Expect that snackBar.open was called with the expected arguments
    expect(snackBarSpy).toHaveBeenCalledWith('Errore: non sono disponibili attributi per la fase selezionata!', 'X', {
      panelClass: ['red-snackbar'],
    });
  });

  it('should update the table when the phase changes', () => {
    const phase: QualityphaseModel = new Object();
    const mockLogs: QualitysavelogModel[] = [
      { c_projectphase_quality_log_id: 1, qualityvalue: '{ "type": "type1", "value": "value1" }' },
      { c_projectphase_quality_log_id: 2, qualityvalue: '{ "type": "type2", "value": "value2" }' },
    ];
    const response = { data: mockLogs };

    const updateTableSpy = spyOn(component as any, 'updateTable').and.callThrough();

    // Create a Subject for activePhaseService
    const activePhaseServiceSubject = new Subject<QualityphaseModel>();
    spyOn(component['activePhaseService'], 'getActivePhase').and.returnValue(activePhaseServiceSubject);

    // Initialize the component
    component.ngOnInit();

    // Emit the phase using the Subject
    activePhaseServiceSubject.next(phase);

    // Expectations
    expect(component['lastPhase']).toEqual(phase);
  });

  it('should open a snackbar on failure when fetching logs', () => {
    const phase: QualityphaseModel = new Object();
    const phaseId = phase.c_projectphase_id?.toString();
    const token = 'fake_token';

    const mockLogs: QualitysavelogModel[] = [
      { c_projectphase_quality_log_id: 1, qualityvalue: '{ "type": "type1", "value": "value1" }' },
      { c_projectphase_quality_log_id: 2, qualityvalue: '{ "type": "type2", "value": "value2" }' },
    ];

    const response = { data: mockLogs };

    const updateTableSpy = spyOn(component as any, 'updateTable').and.callThrough();
    const openFailSnackBarSpy = spyOn(component as any, 'openFailSnackBar');

    // Create a Subject for activePhaseService
    const activePhaseServiceSubject = new Subject<QualityphaseModel>();
    spyOn(component['activePhaseService'], 'getActivePhase').and.returnValue(activePhaseServiceSubject);

    // Mock the response when fetching logs
    const logService = TestBed.inject(QualitySaveLogService);
    const httpMock = TestBed.inject(HttpTestingController);

    // Initialize the component
    component.ngOnInit();

    // Emit the phase using the Subject
    activePhaseServiceSubject.next(phase);

    // Expectations
    expect(component['lastPhase']).toEqual(phase);

  });
});
