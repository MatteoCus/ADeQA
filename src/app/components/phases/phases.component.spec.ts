import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PhasesComponent } from './phases.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { QualityPhaseService } from 'src/app/api/services';
import { ActivePhaseService } from 'src/app/services/active-phase/active-phase.service';
import { AuthInformationsService } from 'src/app/services/auth-informations/auth-informations.service';
import { LogoutService } from 'src/app/services/logout/logout.service';
import { of, throwError } from 'rxjs';
import { QualityphaseModel } from 'src/app/api/models';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PhasesComponent', () => {
  let component: PhasesComponent;
  let fixture: ComponentFixture<PhasesComponent>;
  let httpTestingController: HttpTestingController;
  let mockQualityPhaseService: jasmine.SpyObj<QualityPhaseService>;
  let mockAuthInfoService: AuthInformationsService;
  let mockActivePhaseService: ActivePhaseService;
  let mockLogoutService: LogoutService;
  let snackBar: MatSnackBar;

  const mockPhases: QualityphaseModel[] = [
    {
      c_phase_id: 1,
    },
  ];

  beforeEach(() => {
    mockQualityPhaseService = jasmine.createSpyObj('QualityPhaseService', ['fetch_2']);
    mockQualityPhaseService.fetch_2.and.returnValue(of({ data: mockPhases }));

    mockAuthInfoService = jasmine.createSpyObj('AuthInformationsService', [], {
      Token: 'your_mock_token',
    });

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ScrollingModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      declarations: [PhasesComponent],
      providers: [{ provide: MatSnackBar, useValue: { open: () => {} } },],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    });
    fixture = TestBed.createComponent(PhasesComponent);
    mockActivePhaseService = TestBed.inject(ActivePhaseService);
    mockLogoutService = TestBed.inject(LogoutService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch phases and handle loading', () => {
    
    const req = httpTestingController.expectOne(`https://test.adesuite.com/faltracco/rest/openapi/operation/9000005/qualityphase/fetch`);
    expect(req.request.method).toBe("POST");
    req.flush({"data": mockPhases, "startRow":0, "endRow":1, "totalRows": 1});

    expect(component.loading).toBeFalse();
    expect(component.phases).toEqual(mockPhases);
  });

  it('should handle loading when fetching phases fails', () => {
    const openSnackBarSpy = spyOn(snackBar, 'open');

    const errorResponse = { status: 500, statusText:''  };
    const req = httpTestingController.expectOne(`https://test.adesuite.com/faltracco/rest/openapi/operation/9000005/qualityphase/fetch`);
    expect(req.request.method).toBe("POST");
    req.flush({description: 'Internal Server Error'}, errorResponse);

    expect(component.loading).toBeFalse();
    expect(component.phases.length).toBe(0);
    
    expect(openSnackBarSpy).toHaveBeenCalledWith('Errore 500 - Internal Server Error', 'X', { panelClass: [ 'red-snackbar' ] });
  });

  it('should handle loading when fetching phases fails with error 401', () => {
    const logoutSpy = spyOn(mockLogoutService, 'logout');
    const openSnackBarSpy = spyOn(snackBar, 'open');

    const errorResponse = { status: 401, statusText:''  };
    const req = httpTestingController.expectOne(`https://test.adesuite.com/faltracco/rest/openapi/operation/9000005/qualityphase/fetch`);
    expect(req.request.method).toBe("POST");
    req.flush({description: 'Expired token'}, errorResponse);

    expect(component.loading).toBeFalse();
    expect(component.phases.length).toBe(0);
    
    expect(openSnackBarSpy).toHaveBeenCalledWith('Errore 401 - Expired token', 'X', { panelClass: [ 'red-snackbar' ] });
    expect(logoutSpy).toHaveBeenCalled();
  });

  it('should handle loading when fetching phases fails with error 401 - empty description', () => {
    const logoutSpy = spyOn(mockLogoutService, 'logout');
    const openSnackBarSpy = spyOn(snackBar, 'open');

    const errorResponse = { status: 401, statusText:''  };
    const req = httpTestingController.expectOne(`https://test.adesuite.com/faltracco/rest/openapi/operation/9000005/qualityphase/fetch`);
    expect(req.request.method).toBe("POST");
    req.flush(null, errorResponse);

    expect(component.loading).toBeFalse();
    expect(component.phases.length).toBe(0);
    
    expect(openSnackBarSpy).toHaveBeenCalledWith('Errore 401 - Non autorizzato', 'X', { panelClass: [ 'red-snackbar' ] });
    expect(logoutSpy).toHaveBeenCalled();
  });

  it('should handle loading when fetching phases fails - empty description', () => {
    const openSnackBarSpy = spyOn(snackBar, 'open');

    const errorResponse = { status: 500, statusText:''  };
    const req = httpTestingController.expectOne(`https://test.adesuite.com/faltracco/rest/openapi/operation/9000005/qualityphase/fetch`);
    expect(req.request.method).toBe("POST");
    req.flush(null, errorResponse);

    expect(component.loading).toBeFalse();
    expect(component.phases.length).toBe(0);
    
    expect(openSnackBarSpy).toHaveBeenCalledWith('Errore 500 - Errore lato server', 'X', { panelClass: [ 'red-snackbar' ] });
  });

  it('should handle empty response', () => {
    const openSnackBarSpy = spyOn(snackBar, 'open');

    const req = httpTestingController.expectOne(`https://test.adesuite.com/faltracco/rest/openapi/operation/9000005/qualityphase/fetch`);
    expect(req.request.method).toBe("POST");
    req.flush({});

    expect(component.loading).toBeFalse();
    expect(component.phases.length).toBe(0);
    
    expect(openSnackBarSpy).toHaveBeenCalledWith('Errore: non ci sono fasi da visualizzare!', 'X', { panelClass: [ 'red-snackbar' ] });
  });

  it('should set the active phase', () => {
    const phaseUpdateSpy = spyOn(mockActivePhaseService, 'update');
    const phase = mockPhases[0];
    component.setActivePhase(phase);
    expect(phaseUpdateSpy).toHaveBeenCalledWith(phase);
  });

  it('should handle erratic card selection',() => {
    const openSnackBarSpy = spyOn(snackBar, 'open');

    component.select("a");

    expect(openSnackBarSpy).toHaveBeenCalledWith('La carta selezionata non contiene testo!', 'X', { panelClass: [ 'red-snackbar' ] });
  });
});
