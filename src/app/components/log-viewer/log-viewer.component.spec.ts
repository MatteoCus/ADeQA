import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogViewerComponent } from './log-viewer.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ActiveAttributesService } from 'src/app/services/active-attributes/active-attributes.service';
import { MatTableModule } from '@angular/material/table';

describe('LogViewerComponent', () => {
  let component: LogViewerComponent;
  let fixture: ComponentFixture<LogViewerComponent>;
  let httpTestingController: HttpTestingController;
  let snackBar: MatSnackBar;
  let activeAttributesService: jasmine.SpyObj<ActiveAttributesService>;

  const mockActiveAttributes = [{ attributename: 'Attribute1' }, { attributename: 'Attribute2' }];
  beforeEach(() => {
    activeAttributesService = jasmine.createSpyObj('ActiveAttributesService', ['getActiveAttributes']);
    TestBed.configureTestingModule({
      declarations: [LogViewerComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        MatTableModule,
      ],
      providers: [
        { provide: MatSnackBar, useValue: { open: () => { } } },
        { provide: ActiveAttributesService, useValue: activeAttributesService }
      ]
    });
    fixture = TestBed.createComponent(LogViewerComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should create', () => {
    activeAttributesService.getActiveAttributes.and.returnValue(of(mockActiveAttributes));
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set displayedColumns based on activeAttributes', () => {
    activeAttributesService.getActiveAttributes.and.returnValue(of(mockActiveAttributes));
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.displayedColumns).toEqual(['Attribute1', 'Attribute2']);
  });

  it('should open a snackbar when no attributes are available', () => {
    const openSnackBarSpy = spyOn(snackBar, 'open');
    activeAttributesService.getActiveAttributes.and.returnValue(of([]));
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(openSnackBarSpy).toHaveBeenCalledWith('Errore: non sono disponibili attributi per la fase selezionata!', 'X', { panelClass: ['red-snackbar'] });
  });
});
