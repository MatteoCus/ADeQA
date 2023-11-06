import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DashboardComponent } from './dashboard.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PhasesComponent } from '../phases/phases.component';
import { LogModifierComponent } from '../log-modifier/log-modifier.component';
import { LogViewerComponent } from '../log-viewer/log-viewer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { AuthInformationsService } from 'src/app/services/auth-informations/auth-informations.service';
import { IframeInitializerService } from 'src/app/services/iframe-initializer/iframe-initializer.service';
import { BehaviorSubject, of } from 'rxjs';



describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let httpTestingController: HttpTestingController;
  let authInfoService: AuthInformationsService;
  let snackBar: MatSnackBar;
  let iframeInitService: IframeInitializerService;
  let changeDetectorRef: ChangeDetectorRef;
  let router: Router;
  let mediaMatcher: MediaMatcher;

  const queryParamsSubject = new BehaviorSubject({});
  const activatedRoute = {
    snapshot: {
      paramMap: convertToParamMap({
        inside: 'false',  // Simulate query parameter 'inside'
      }),
    },
    queryParams: of({ inside: 'false' }),  // Simulate observable queryParams
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        MatIconModule,
        MatSidenavModule,
        MatToolbarModule,
        MatSlideToggleModule,
        MatMenuModule,
        BrowserAnimationsModule,
        ScrollingModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        DashboardComponent,
        SidenavComponent,
        ToolbarComponent,
        PhasesComponent,
        LogModifierComponent,
        LogViewerComponent,
        ToolbarComponent
      ],
      providers: [
        { provide: MatSnackBar, useValue: { open: () => { } } },
        { provide: AuthInformationsService },
        { provide: Router },
        { provide: IframeInitializerService },
        { provide: ChangeDetectorRef },
        { provide: MediaMatcher },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authInfoService = TestBed.inject(AuthInformationsService);
    snackBar = TestBed.inject(MatSnackBar);
    router = TestBed.inject(Router);
    iframeInitService = TestBed.inject(IframeInitializerService);
    httpTestingController = TestBed.inject(HttpTestingController);
    changeDetectorRef = TestBed.inject(ChangeDetectorRef);
    mediaMatcher = TestBed.inject(MediaMatcher);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize when insideFrame is false and Token and UserId are set', () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']); // Define routerSpy

    // Set insideFrame to false
    component.InsideFrame = false;

    // Simulate AuthInformationsService with Token and UserId set
    authInfoService.Token = '';
    authInfoService.UserId = 123;

    // Simulate query parameter observable
    queryParamsSubject.next({});

    // Instantiate the component
    component = new DashboardComponent(
      authInfoService,
      routerSpy, // Use routerSpy
      changeDetectorRef,
      mediaMatcher,
      activatedRoute as any as ActivatedRoute,
      iframeInitService
    );

    // Expect that router.navigate was not called since InsideFrame is false
    expect(component.InsideFrame).toBeFalse();
  });

  it('should navigate to login/username when insideFrame is false and Token or UserId is missing', () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']); // Define routerSpy

    // Set insideFrame to false
    component.InsideFrame = false;

    // Simulate AuthInformationsService with Token and UserId set
    authInfoService.Token = '';
    authInfoService.UserId = 0;

    // Simulate query parameter observable
    queryParamsSubject.next({});

    // Instantiate the component
    component = new DashboardComponent(
      authInfoService,
      routerSpy, // Use routerSpy
      changeDetectorRef,
      mediaMatcher,
      activatedRoute as any as ActivatedRoute,
      iframeInitService
    );

    // Expect that router.navigate was called with 'login/username' since InsideFrame is false and Token or UserId is missing
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login/username']);
    expect(component.InsideFrame).toBeFalse();
    expect(authInfoService.Token).toBe("");
  });

  it('should handle postMessage when insideFrame is true with missing data', () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']); // Define routerSpy

    // Set insideFrame to true
    component.InsideFrame = true;

    // Instantiate the component
    component = new DashboardComponent(
      authInfoService,
      routerSpy, // Use routerSpy
      changeDetectorRef,
      mediaMatcher,
      activatedRoute as any as ActivatedRoute,
      iframeInitService
    );

    // Expect that insideFrame is set to false
    expect(component.InsideFrame).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login/username']);
  });

});
