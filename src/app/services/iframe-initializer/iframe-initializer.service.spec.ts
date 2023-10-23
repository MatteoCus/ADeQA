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
import { of } from 'rxjs';

describe('IframeInitializerService', () => {
  let service: IframeInitializerService;
  let snackBar: MatSnackBar;
  let authInfoService: AuthInformationsService;
  let languageService: LanguageService;
  let activePhaseService: ActivePhaseService;
  let themeService: ThemeService;
  let qualityPhaseService: QualityPhaseService;
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
        MatSnackBar
      ]
    });
    service = TestBed.inject(IframeInitializerService);
    snackBar = TestBed.inject(MatSnackBar);
    authInfoService = TestBed.inject(AuthInformationsService);
    languageService = TestBed.inject(LanguageService);
    activePhaseService = TestBed.inject(ActivePhaseService);
    themeService = TestBed.inject(ThemeService);
    qualityPhaseService = TestBed.inject(QualityPhaseService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize services', () => {
    const data: Message = {
      token: '',
      username: 'user123',
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
          c_projectphase_id: 123, // Replace with your actual data
          // Add other properties as needed
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

    // You can add more expectations based on your specific logic
  });

  it('should changeLanguage and update authInfoService when initializing services', () => {
    const data: Message = {
      token: '',
      username: 'user123',
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
    expect(authInfoService.UserName).toEqual('user123');
    expect(authInfoService.UserTheme).toEqual('DM');
  });

  it('should fetch quality phase and update active phase when initializing services', () => {
    const data: Message = {
      token: 'sampleToken',
      username: 'user123',
      theme: 'DM',
      lang: 'en',
      c_projectphase_id: 123,
      m_product_id: 111222333,
      user_id: 9000000
    };
  
    const phaseData = {
      data: [
        {
          c_projectphase_id: 123, // Replace with your actual data
          // Add other properties as needed
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
  
  
  
});
