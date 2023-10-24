import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IframeInitializerService } from './iframe-initializer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { QualityPhaseService } from 'src/app/api/services';
import { ActivePhaseService } from '../active-phase/active-phase.service';
import { AuthInformationsService } from '../auth-informations/auth-informations.service';
import { LanguageService } from '../language/language.service';
import { ThemeService } from '../theme/theme.service';
import { LogoutService } from '../logout/logout.service';
import { Message } from 'src/app/models/message';
import { of, throwError } from 'rxjs';

describe('IframeInitializerService', () => {
  let service: IframeInitializerService;
  let snackBar: MatSnackBar;
  let authInfoService: AuthInformationsService;
  let languageService: LanguageService;
  let activePhaseService: ActivePhaseService;
  let themeService: ThemeService;
  let qualityPhaseService: QualityPhaseService;
  let logoutService: LogoutService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [
        AuthInformationsService,
        LanguageService,
        ActivePhaseService,
        ThemeService,
        QualityPhaseService,
        LogoutService,
        { provide: MatSnackBar, useValue: { open: () => {} } }
      ]
    });
    service = TestBed.inject(IframeInitializerService);
    snackBar = TestBed.inject(MatSnackBar);
    authInfoService = TestBed.inject(AuthInformationsService);
    languageService = TestBed.inject(LanguageService);
    activePhaseService = TestBed.inject(ActivePhaseService);
    themeService = TestBed.inject(ThemeService);
    qualityPhaseService = TestBed.inject(QualityPhaseService);
    logoutService = TestBed.inject(LogoutService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize services', () => {
    const data: Message = {
      token: '',
      username: 'John Doe',
      theme: 'DM',
      lang: 'en',
      c_projectphase_id: 123,
      m_product_id: 111222333,
      user_id: 9000000
    };

    spyOn(authInfoService, 'clearUser').and.stub();
    spyOn(languageService, 'changeLanguage').and.stub();

    const phaseData = {
      data: [
        {
          c_projectphase_id: 123
        }
      ]
    };

    spyOn(qualityPhaseService, 'fetch_2').and.returnValue(of(phaseData));
    spyOn(activePhaseService, 'update').and.stub();
    spyOn(themeService, 'toggleTheme').and.stub();

    spyOn(snackBar, 'open').and.stub();

    service.initialize(data);

    expect(authInfoService.Token).toEqual(data.token);
    expect(authInfoService.UserId).toEqual(data.user_id);
    expect(authInfoService.UserName).toEqual(data.username);
    expect(authInfoService.UserTheme).toEqual(data.theme);
    expect(languageService.changeLanguage).toHaveBeenCalledWith(data.lang);

    const qualityPhaseParams = {
      AdesuiteToken: data.token,
      body: {
        startRow: 0,
        criteria: [
          {
            fieldName:  'c_projectphase_id' as 'c_phase_id' | 'm_product_category_id' | 'm_product_id' | 'status' | 'projectplan_timeline_id' | 'isglobal' | 'c_projectphase_id' | 'c_bpartner_id' | 'linename' | 'color' | 'start_plan' | 'phasename' | 'end_plan' | 'customer' | 'c_projectline_id' | 'ad_org_id' | 'ad_client_id',
            value: data.c_projectphase_id.toString(),
            operator: 'equals' as "equals" | "iNotContains" | "iContains" | "greaterOrEqual" | "lessOrEqual" | undefined
          }
        ],
        endRow: 1
      }
    };

    expect(qualityPhaseService.fetch_2).toHaveBeenCalledWith(qualityPhaseParams);
    expect(activePhaseService.update).toHaveBeenCalledWith(phaseData.data[0]);
  });

  it('should changeLanguage and update authInfoService when initializing services', () => {
    const data: Message = {
      token: '',
      username: 'John Doe',
      theme: 'DM',
      lang: 'en',
      c_projectphase_id: 123,
      m_product_id: 111222333,
      user_id: 9000000
    };
    spyOn(languageService, 'changeLanguage').and.stub();
  
    service.initialize(data);
  
    expect(languageService.changeLanguage).toHaveBeenCalledWith(data.lang);
    expect(authInfoService.Token).toEqual('');
    expect(authInfoService.UserId).toEqual(9000000);
    expect(authInfoService.UserName).toEqual('John Doe');
    expect(authInfoService.UserTheme).toEqual('DM');
  });

  it('should fetch quality phase and update active phase when initializing services', () => {
    const data: Message = {
      token: '',
      username: 'John Doe',
      theme: 'DM',
      lang: 'en',
      c_projectphase_id: 123,
      m_product_id: 111222333,
      user_id: 9000000
    };
  
    const phaseData = {
      data: [
        {
          c_projectphase_id: 123,
        }
      ]
    };
  
    spyOn(qualityPhaseService, 'fetch_2').and.returnValue(of(phaseData));
    spyOn(activePhaseService, 'update').and.stub();
  
    service.initialize(data);
  
    const qualityPhaseParams = {
      AdesuiteToken: data.token,
      body: {
        startRow: 0,
        criteria: [
          {
            fieldName: 'c_projectphase_id' as 'c_phase_id' | 'm_product_category_id' | 'm_product_id' | 'status' | 'projectplan_timeline_id' | 'isglobal' | 'c_projectphase_id' | 'c_bpartner_id' | 'linename' | 'color' | 'start_plan' | 'phasename' | 'end_plan' | 'customer' | 'c_projectline_id' | 'ad_org_id' | 'ad_client_id',
            value: data.c_projectphase_id.toString(),
            operator: 'equals' as "equals" | "iNotContains" | "iContains" | "greaterOrEqual" | "lessOrEqual" | undefined
          }
        ],
        endRow: 1
      }
    };
  
    expect(qualityPhaseService.fetch_2).toHaveBeenCalledWith(qualityPhaseParams);
    expect(activePhaseService.update).toHaveBeenCalledWith(phaseData.data[0]);
  });
  
  it('should have no phases to show', () => {
    const openSnackBarSpy = spyOn(snackBar, 'open');
    
    const data: Message = {
      token: '',
      username: 'John Doe',
      theme: 'DM',
      lang: 'en',
      c_projectphase_id: 123,
      m_product_id: 111222333,
      user_id: 9000000
    };

    spyOn(authInfoService, 'clearUser').and.stub();
    spyOn(languageService, 'changeLanguage').and.stub();

    const phaseData = {
      data: [ undefined ]
    };

    spyOn(qualityPhaseService, 'fetch_2').and.returnValue(of(phaseData as any));
    spyOn(activePhaseService, 'update').and.stub();
    spyOn(themeService, 'toggleTheme').and.stub();

    service.initialize(data);

    expect(authInfoService.Token).toEqual(data.token);
    expect(authInfoService.UserId).toEqual(data.user_id);
    expect(authInfoService.UserName).toEqual(data.username);
    expect(authInfoService.UserTheme).toEqual(data.theme);
    expect(languageService.changeLanguage).toHaveBeenCalledWith(data.lang);

    const qualityPhaseParams = {
      AdesuiteToken: data.token,
      body: {
        startRow: 0,
        criteria: [
          {
            fieldName:  'c_projectphase_id' as 'c_phase_id' | 'm_product_category_id' | 'm_product_id' | 'status' | 'projectplan_timeline_id' | 'isglobal' | 'c_projectphase_id' | 'c_bpartner_id' | 'linename' | 'color' | 'start_plan' | 'phasename' | 'end_plan' | 'customer' | 'c_projectline_id' | 'ad_org_id' | 'ad_client_id',
            value: data.c_projectphase_id.toString(),
            operator: 'equals' as "equals" | "iNotContains" | "iContains" | "greaterOrEqual" | "lessOrEqual" | undefined
          }
        ],
        endRow: 1
      }
    };

    expect(qualityPhaseService.fetch_2).toHaveBeenCalledWith(qualityPhaseParams);
    expect(openSnackBarSpy).toHaveBeenCalledWith('Errore: non ci sono fasi da visualizzare!', 'X', { panelClass: [ 'red-snackbar', 'login-snackbar' ] });
  });

  it('should handle error - 401', () => {
    const openSnackBarSpy = spyOn(snackBar, 'open');
    const errorResponse = { error: { description: 'Utente non autorizzato' }, status: 401 };
    const logoutServiceSpy = spyOn(logoutService, 'logout');
    
    const data: Message = {
      token: '',
      username: 'John Doe',
      theme: 'DM',
      lang: 'en',
      c_projectphase_id: 123,
      m_product_id: 111222333,
      user_id: 9000000
    };

    spyOn(authInfoService, 'clearUser').and.stub();
    spyOn(languageService, 'changeLanguage').and.stub();

    spyOn(qualityPhaseService, 'fetch_2').and.returnValue(throwError(() => errorResponse));
    spyOn(activePhaseService, 'update').and.stub();
    spyOn(themeService, 'toggleTheme').and.stub();

    service.initialize(data);

    expect(authInfoService.Token).toEqual(data.token);
    expect(authInfoService.UserId).toEqual(data.user_id);
    expect(authInfoService.UserName).toEqual(data.username);
    expect(authInfoService.UserTheme).toEqual(data.theme);
    expect(languageService.changeLanguage).toHaveBeenCalledWith(data.lang);

    const qualityPhaseParams = {
      AdesuiteToken: data.token,
      body: {
        startRow: 0,
        criteria: [
          {
            fieldName:  'c_projectphase_id' as 'c_phase_id' | 'm_product_category_id' | 'm_product_id' | 'status' | 'projectplan_timeline_id' | 'isglobal' | 'c_projectphase_id' | 'c_bpartner_id' | 'linename' | 'color' | 'start_plan' | 'phasename' | 'end_plan' | 'customer' | 'c_projectline_id' | 'ad_org_id' | 'ad_client_id',
            value: data.c_projectphase_id.toString(),
            operator: 'equals' as "equals" | "iNotContains" | "iContains" | "greaterOrEqual" | "lessOrEqual" | undefined
          }
        ],
        endRow: 1
      }
    };

    expect(qualityPhaseService.fetch_2).toHaveBeenCalledWith(qualityPhaseParams);
    expect(openSnackBarSpy).toHaveBeenCalledWith('Errore 401 - Il token di accesso non è più valido', 'X', { panelClass: [ 'red-snackbar', 'login-snackbar' ] });
    expect(logoutServiceSpy).toHaveBeenCalled();
  });

  it('should handle error - 500', () => {
    const openSnackBarSpy = spyOn(snackBar, 'open');
    const errorResponse = { error: { description: 'Errore lato server generico' }, status: 500 };
    
    const data: Message = {
      token: '',
      username: 'John Doe',
      theme: 'DM',
      lang: 'en',
      c_projectphase_id: 123,
      m_product_id: 111222333,
      user_id: 9000000
    };

    spyOn(authInfoService, 'clearUser').and.stub();
    spyOn(languageService, 'changeLanguage').and.stub();

    spyOn(qualityPhaseService, 'fetch_2').and.returnValue(throwError(() => errorResponse));
    spyOn(activePhaseService, 'update').and.stub();
    spyOn(themeService, 'toggleTheme').and.stub();

    service.initialize(data);

    expect(authInfoService.Token).toEqual(data.token);
    expect(authInfoService.UserId).toEqual(data.user_id);
    expect(authInfoService.UserName).toEqual(data.username);
    expect(authInfoService.UserTheme).toEqual(data.theme);
    expect(languageService.changeLanguage).toHaveBeenCalledWith(data.lang);

    const qualityPhaseParams = {
      AdesuiteToken: data.token,
      body: {
        startRow: 0,
        criteria: [
          {
            fieldName:  'c_projectphase_id' as 'c_phase_id' | 'm_product_category_id' | 'm_product_id' | 'status' | 'projectplan_timeline_id' | 'isglobal' | 'c_projectphase_id' | 'c_bpartner_id' | 'linename' | 'color' | 'start_plan' | 'phasename' | 'end_plan' | 'customer' | 'c_projectline_id' | 'ad_org_id' | 'ad_client_id',
            value: data.c_projectphase_id.toString(),
            operator: 'equals' as "equals" | "iNotContains" | "iContains" | "greaterOrEqual" | "lessOrEqual" | undefined
          }
        ],
        endRow: 1
      }
    };

    expect(qualityPhaseService.fetch_2).toHaveBeenCalledWith(qualityPhaseParams);
    expect(openSnackBarSpy).toHaveBeenCalledWith('Errore 500 - Errore lato server generico', 'X', { panelClass: [ 'red-snackbar', 'login-snackbar' ] });
  });

  it('should handle error - 401 null error body', () => {
    const openSnackBarSpy = spyOn(snackBar, 'open');
    const errorResponse = { error: null, status: 401 };
    const logoutServiceSpy = spyOn(logoutService, 'logout');
    
    const data: Message = {
      token: '',
      username: 'John Doe',
      theme: 'DM',
      lang: 'en',
      c_projectphase_id: 123,
      m_product_id: 111222333,
      user_id: 9000000
    };

    spyOn(authInfoService, 'clearUser').and.stub();
    spyOn(languageService, 'changeLanguage').and.stub();

    spyOn(qualityPhaseService, 'fetch_2').and.returnValue(throwError(() => errorResponse));
    spyOn(activePhaseService, 'update').and.stub();
    spyOn(themeService, 'toggleTheme').and.stub();

    service.initialize(data);

    expect(authInfoService.Token).toEqual(data.token);
    expect(authInfoService.UserId).toEqual(data.user_id);
    expect(authInfoService.UserName).toEqual(data.username);
    expect(authInfoService.UserTheme).toEqual(data.theme);
    expect(languageService.changeLanguage).toHaveBeenCalledWith(data.lang);

    const qualityPhaseParams = {
      AdesuiteToken: data.token,
      body: {
        startRow: 0,
        criteria: [
          {
            fieldName:  'c_projectphase_id' as 'c_phase_id' | 'm_product_category_id' | 'm_product_id' | 'status' | 'projectplan_timeline_id' | 'isglobal' | 'c_projectphase_id' | 'c_bpartner_id' | 'linename' | 'color' | 'start_plan' | 'phasename' | 'end_plan' | 'customer' | 'c_projectline_id' | 'ad_org_id' | 'ad_client_id',
            value: data.c_projectphase_id.toString(),
            operator: 'equals' as "equals" | "iNotContains" | "iContains" | "greaterOrEqual" | "lessOrEqual" | undefined
          }
        ],
        endRow: 1
      }
    };

    expect(qualityPhaseService.fetch_2).toHaveBeenCalledWith(qualityPhaseParams);
    expect(openSnackBarSpy).toHaveBeenCalledWith('Errore 401 - Non autorizzato', 'X', { panelClass: [ 'red-snackbar', 'login-snackbar' ] });
    expect(logoutServiceSpy).toHaveBeenCalled();
  });

  it('should handle error - 500 null error body', () => {
    const openSnackBarSpy = spyOn(snackBar, 'open');
    const errorResponse = { error: null, status: 500 };
    
    const data: Message = {
      token: '',
      username: 'John Doe',
      theme: 'DM',
      lang: 'en',
      c_projectphase_id: 123,
      m_product_id: 111222333,
      user_id: 9000000
    };

    spyOn(authInfoService, 'clearUser').and.stub();
    spyOn(languageService, 'changeLanguage').and.stub();

    spyOn(qualityPhaseService, 'fetch_2').and.returnValue(throwError(() => errorResponse));
    spyOn(activePhaseService, 'update').and.stub();
    spyOn(themeService, 'toggleTheme').and.stub();

    service.initialize(data);

    expect(authInfoService.Token).toEqual(data.token);
    expect(authInfoService.UserId).toEqual(data.user_id);
    expect(authInfoService.UserName).toEqual(data.username);
    expect(authInfoService.UserTheme).toEqual(data.theme);
    expect(languageService.changeLanguage).toHaveBeenCalledWith(data.lang);

    const qualityPhaseParams = {
      AdesuiteToken: data.token,
      body: {
        startRow: 0,
        criteria: [
          {
            fieldName:  'c_projectphase_id' as 'c_phase_id' | 'm_product_category_id' | 'm_product_id' | 'status' | 'projectplan_timeline_id' | 'isglobal' | 'c_projectphase_id' | 'c_bpartner_id' | 'linename' | 'color' | 'start_plan' | 'phasename' | 'end_plan' | 'customer' | 'c_projectline_id' | 'ad_org_id' | 'ad_client_id',
            value: data.c_projectphase_id.toString(),
            operator: 'equals' as "equals" | "iNotContains" | "iContains" | "greaterOrEqual" | "lessOrEqual" | undefined
          }
        ],
        endRow: 1
      }
    };

    expect(qualityPhaseService.fetch_2).toHaveBeenCalledWith(qualityPhaseParams);
    expect(openSnackBarSpy).toHaveBeenCalledWith('Errore 500 - Errore lato server', 'X', { panelClass: [ 'red-snackbar', 'login-snackbar' ] });
  });
  
});
